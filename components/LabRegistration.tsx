import React, { useState, useEffect, useRef } from 'react';
import { X, QrCode, Terminal, ChevronRight, CheckCircle2, Edit3, Wallet, Shield, UserCircle, Calendar, Building2, ScanLine, ArrowRight, Mail, GraduationCap, BookOpen, Layers, Globe, AlertTriangle, Linkedin, Copy, Check } from 'lucide-react';
import { auth, db } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { PrivacyPolicy } from './PrivacyPolicy';
import { SocialProofBanner } from './SocialProofBanner';
import { TermsOfService } from './TermsOfService';
import { GDPRDataManagement } from './GDPRDataManagement';
import { analytics, RegistrationSession } from '../services/analyticsService';
import { securityService } from '../services/securityService';

interface LabRegistrationProps {
   onClose: () => void;
}

export const LabRegistration: React.FC<LabRegistrationProps> = ({ onClose }) => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      dob: '',
      role: 'Student', // Default
      studentLevel: 'Undergraduate',
      degree: '',
      organization: '',
      privacy: false,
      // New fields for enhanced data collection
      interestAreas: [] as string[],
      experienceLevel: '',
      motivation: '',
      // Security: Honeypot field (hidden from users, should remain empty)
      website: '', // Honeypot field
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [accessId, setAccessId] = useState('');
   const [step, setStep] = useState(1); // 1 = Form, 2 = Access Granted
   const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');
   const [isLoading, setIsLoading] = useState(true);
   const [errors, setErrors] = useState<Record<string, string>>({});
   const [waitlistPosition, setWaitlistPosition] = useState<number | null>(null);
   const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
   const [showTermsOfService, setShowTermsOfService] = useState(false);
   const [showGDPRManagement, setShowGDPRManagement] = useState(false);
   const [registrationSession] = useState(() => new RegistrationSession());
   const [securityErrors, setSecurityErrors] = useState<string[]>([]);
   const [securityWarnings, setSecurityWarnings] = useState<string[]>([]);
   const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
   const [copyButtonState, setCopyButtonState] = useState<'idle' | 'copied'>('idle');

   // Ref for scrollable container
   const scrollContainerRef = useRef<HTMLDivElement>(null);

   const validateForm = () => {
      const newErrors: Record<string, string> = {};

      if (!formData.name.trim() || formData.name.length < 2) {
         newErrors.name = "Name must be at least 2 characters";
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim() || !emailRegex.test(formData.email)) {
         newErrors.email = "Please enter a valid email address";
      }

      if (!formData.dob) {
         newErrors.dob = "Date of birth is required";
      } else {
         const birthDate = new Date(formData.dob);
         const today = new Date();
         if (birthDate >= today) {
            newErrors.dob = "Date of birth must be in the past";
         }
      }

      if (!formData.organization.trim()) {
         newErrors.organization = "Organization is required";
      }

      if (formData.role === 'Student' && (!formData.degree || !formData.degree.trim())) {
         newErrors.degree = "Degree/Major is required";
      }

      // New field validations
      if (formData.interestAreas.length === 0) {
         newErrors.interestAreas = "Please select at least one area of interest";
      }

      if (!formData.experienceLevel) {
         newErrors.experienceLevel = "Experience level is required";
      }



      if (!formData.privacy) {
         newErrors.privacy = "You must accept the privacy policy";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   // Check for existing registration on mount
   useEffect(() => {
      const checkAccess = () => {
         try {
            // 1. Check Local Storage first for speed
            const storedAccessId = localStorage.getItem('ment4ai_lab_access_id');
            if (storedAccessId) {
               setAccessId(storedAccessId);
               setStep(2);
               setMobileTab('preview');
               setIsLoading(false);
               return;
            }
         } catch (error) {
            console.error("Access Check Error:", error);
         } finally {
            setIsLoading(false);
         }
      };

      // Generate unique IDs if we don't have them yet
      if (step === 1) {
         setAccessId(Math.random().toString(36).substring(2, 10).toUpperCase());
      }

      checkAccess();
   }, []);

   // Scroll to top when modal opens or step changes
   useEffect(() => {
      if (scrollContainerRef.current) {
         scrollContainerRef.current.scrollTop = 0;
      }
   }, [step, mobileTab]);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;
      if (type === 'checkbox') {
         const checked = (e.target as HTMLInputElement).checked;

         // Handle interest areas (checkbox array)
         if (name === 'interestAreas') {
            const interestValue = value;
            setFormData(prev => ({
               ...prev,
               interestAreas: checked
                  ? [...prev.interestAreas, interestValue]
                  : prev.interestAreas.filter(area => area !== interestValue)
            }));
            if (checked) {
               registrationSession.trackFieldCompletion('interestAreas');
            }
         } else {
            // Handle regular checkboxes (privacy, newsletter)
            setFormData(prev => ({ ...prev, [name]: checked }));
            if (checked && name === 'privacy') {
               registrationSession.trackFieldCompletion('privacy');
            }
         }
      } else {
         setFormData(prev => ({ ...prev, [name]: value }));
         // Track field completion when user enters data
         if (value && value.length > 0) {
            registrationSession.trackFieldCompletion(name);
         }
      }
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) return;

      setIsSubmitting(true);
      setSecurityErrors([]);
      setSecurityWarnings([]);

      try {


         // Get user metadata
         const userAgent = navigator.userAgent;
         let ipAddress = 'unknown';

         // Try to get IP address (optional - requires external service)
         try {
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            ipAddress = ipData.ip;
         } catch (error) {
            console.log('Could not fetch IP address');
         }

         // SECURITY CHECKS
         console.log('🔒 Running security checks...');
         const securityCheck = await securityService.performSecurityChecks({
            email: formData.email,
            ipAddress,
            userAgent,
            honeypot: formData.website, // Honeypot field
         });

         if (!securityCheck.passed) {
            setSecurityErrors(securityCheck.errors);
            setSecurityWarnings(securityCheck.warnings);
            analytics.trackError('security_check_failed', securityCheck.errors.join('; '));
            setIsSubmitting(false);
            return;
         }

         if (securityCheck.warnings.length > 0) {
            setSecurityWarnings(securityCheck.warnings);
         }

         // Log rate limit attempt
         await securityService.logRateLimitAttempt(formData.email, ipAddress, userAgent);

         console.log('✅ Security checks passed');

         // Calculate waitlist position (count existing users + 1)
         const { getCountFromServer, collection: firestoreCollection, query } = await import('firebase/firestore');
         const usersRef = firestoreCollection(db, "mvf_cli_beta_access_users");
         const snapshot = await getCountFromServer(usersRef);
         const position = snapshot.data().count + 1;
         setWaitlistPosition(position);

         // Build comprehensive registration data
         const registrationData = {
            // Basic user info
            ...formData,
            accessId,




            // Waitlist & Status
            waitlistPosition: position,
            status: 'pending' as const, // Start as pending, admin can approve
            approvedAt: null,
            lastActiveAt: serverTimestamp(),

            // Timestamps
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),

            // Metadata for fraud detection
            ipAddress,
            userAgent,
         };

         await addDoc(collection(db, "mvf_cli_beta_access_users"), registrationData);

         // 2. Persist locally
         localStorage.setItem('ment4ai_lab_access_id', accessId);
         localStorage.setItem('ment4ai_lab_user_name', formData.name);
         localStorage.setItem('ment4ai_lab_waitlist_position', position.toString());

         // 3. Success State
         registrationSession.trackCompletion({
            role: formData.role,
            organization: formData.organization,
            experienceLevel: formData.experienceLevel,
            interestAreas: formData.interestAreas,

         });
         analytics.trackWaitlistPosition(position);
         setStep(2);
         setMobileTab('preview'); // Show card on success
      } catch (error: any) {
         console.error("Registration Error:", error);
         registrationSession.trackFailure(error.message || "Unknown error");
         alert(`Connection to the Node failed: ${error.message || "Unknown error"}`);
      } finally {
         setIsSubmitting(false);
      }
   };

   // Shared Input Styles
   // Shared Input Styles - COMPACT MODE
   // Shared Input Styles - COMPACT MODE
   const inputContainerClass = (error?: boolean) => `group relative bg-neutral-900 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-lg transition-all duration-300 focus-within:border-brand-yellow/60 focus-within:bg-neutral-800/80 hover:border-white/20 overflow-hidden`;
   const inputClass = "w-full bg-transparent border-none py-2.5 pl-10 pr-4 text-base md:text-sm text-white placeholder-neutral-600 focus:ring-0 focus:outline-none transition-all";
   const selectClass = "w-full bg-transparent border-none py-2.5 pl-10 pr-10 text-base md:text-sm text-white focus:ring-0 focus:outline-none appearance-none cursor-pointer [&>option]:bg-neutral-900 [&>option]:text-white";
   const labelClass = "text-[9px] font-mono uppercase tracking-widest text-neutral-500 ml-1 mb-1 block group-focus-within:text-brand-yellow/80 transition-colors";
   const iconClass = "absolute left-3 top-2.5 w-4 h-4 text-neutral-600 group-focus-within:text-brand-yellow transition-colors duration-300 pointer-events-none";
   const errorClass = "text-[10px] text-red-400 mt-1 ml-1 font-medium animate-fade-in";

   return (
      <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-0 md:p-6 animate-fade-in overflow-hidden h-[100dvh]">

         {/* Background Grid & Ambient Light */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow/5 blur-[120px] rounded-full pointer-events-none"></div>

         {/* Main Container */}
         {/* Main Container - Adjusted height for laptops */}
         <div className="relative w-full h-full md:max-w-6xl md:h-[85vh] lg:h-[80vh] flex flex-col md:flex-row bg-[#0A0A0A] border-0 md:border border-white/10 md:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/5">

            {/* Mobile Header & Tabs */}
            <div className="md:hidden flex flex-col bg-neutral-900/50 backdrop-blur-md border-b border-white/5 shrink-0 relative z-30">
               <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-brand-yellow rounded-full animate-pulse"></div>
                     <span className="font-display font-bold text-sm tracking-tight text-white">mfourlabs.Lab</span>
                  </div>
                  <button onClick={onClose} className="p-2 text-neutral-400 hover:text-white">
                     <X className="w-5 h-5" />
                  </button>
               </div>
               {step === 1 && (
                  <div className="grid grid-cols-2 border-t border-white/5">
                     <button
                        onClick={() => setMobileTab('form')}
                        className={`py-3 text-xs font-medium tracking-wide flex items-center justify-center gap-2 transition-colors ${mobileTab === 'form' ? 'bg-white/5 text-brand-yellow border-b-2 border-brand-yellow' : 'text-neutral-500'}`}
                     >
                        <Edit3 className="w-3.5 h-3.5" /> Registration
                     </button>
                     <button
                        onClick={() => setMobileTab('preview')}
                        className={`py-3 text-xs font-medium tracking-wide flex items-center justify-center gap-2 transition-colors ${mobileTab === 'preview' ? 'bg-white/5 text-brand-yellow border-b-2 border-brand-yellow' : 'text-neutral-500'}`}
                     >
                        <Wallet className="w-3.5 h-3.5" /> ID Preview
                     </button>
                  </div>
               )}
            </div>

            {/* LEFT PANEL: Live Configuration (Form) */}
            <div className={`flex-1 flex flex-col min-h-0 relative z-10 transition-all duration-500 ${mobileTab === 'form' ? 'opacity-100 translate-x-0' : 'hidden md:flex'}`}>

               {/* Desktop Header - More Compact */}
               <div className="hidden md:flex items-center justify-between p-5 border-b border-white/5 bg-gradient-to-r from-white/[0.02] to-transparent shrink-0">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <Terminal className="w-4 h-4 text-brand-yellow" />
                     </div>
                     <div>
                        <h2 className="text-lg font-display font-semibold text-white tracking-tight">Access Protocol</h2>
                        <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Secure Gateway v2.4</div>
                     </div>
                  </div>
                  <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors flex items-center gap-2 group">
                     <span className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">CLOSE</span>
                     <div className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <X className="w-5 h-5" />
                     </div>
                  </button>
               </div>

               {/* Content - Optimized spacing */}
               <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 pb-40 md:pb-6 scrollbar-hide">
                  {step === 1 ? (
                     <div className="max-w-3xl mx-auto flex flex-col justify-start">

                        {/* Briefing (Compact) */}
                        <div className="mb-6 flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-neutral-900 to-transparent border border-white/5 shrink-0">
                           <div className="p-2 bg-brand-yellow/10 rounded-md text-brand-yellow ring-1 ring-brand-yellow/20">
                              <Shield className="w-4 h-4" />
                           </div>
                           <div>
                              <h4 className="text-xs font-medium text-white tracking-wide">Classified Research Access</h4>
                              <p className="text-[10px] text-neutral-500 mt-0.5">First Principles Engineering. No Abstractions.</p>
                           </div>
                        </div>

                        {/* Social Proof & Urgency Banner */}
                        <div className="mb-6">
                           <SocialProofBanner
                              earlyAccessEndDate={new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)}
                           />
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">

                           {/* Honeypot Field - Hidden from users, catches bots */}
                           <div className="hidden" aria-hidden="true">
                              <label htmlFor="website">Website (leave blank)</label>
                              <input
                                 type="text"
                                 name="website"
                                 id="website"
                                 value={formData.website}
                                 onChange={handleChange}
                                 tabIndex={-1}
                                 autoComplete="off"
                              />
                           </div>

                           {/* Security Errors Display */}
                           {securityErrors.length > 0 && (
                              <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-4 animate-fade-in">
                                 <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                       <h4 className="text-sm font-semibold text-red-300 mb-2">Security Check Failed</h4>
                                       <ul className="space-y-1">
                                          {securityErrors.map((error, index) => (
                                             <li key={index} className="text-xs text-red-200 leading-relaxed">
                                                • {error}
                                             </li>
                                          ))}
                                       </ul>
                                    </div>
                                 </div>
                              </div>
                           )}

                           {/* Security Warnings Display */}
                           {securityWarnings.length > 0 && securityErrors.length === 0 && (
                              <div className="bg-orange-950/20 border border-orange-500/30 rounded-xl p-4 animate-fade-in">
                                 <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                       <h4 className="text-sm font-semibold text-orange-300 mb-2">Security Notice</h4>
                                       <ul className="space-y-1">
                                          {securityWarnings.map((warning, index) => (
                                             <li key={index} className="text-xs text-orange-200 leading-relaxed">
                                                • {warning}
                                             </li>
                                          ))}
                                       </ul>
                                    </div>
                                 </div>
                              </div>
                           )}

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Name */}
                              <div className="space-y-0.5">
                                 <label className={labelClass}>FULL LEGAL NAME</label>
                                 <div className={inputContainerClass(!!errors.name)}>
                                    <UserCircle className={iconClass} />
                                    <input
                                       name="name"
                                       value={formData.name}
                                       onChange={handleChange}
                                       type="text"
                                       placeholder="ex. Alex Chen"
                                       className={inputClass}
                                    />
                                 </div>
                                 {errors.name && <div className={errorClass}>{errors.name}</div>}
                              </div>

                              {/* DOB */}
                              <div className="space-y-0.5">
                                 <label className={labelClass}>DATE OF BIRTH</label>
                                 <div className={inputContainerClass(!!errors.dob)}>
                                    <Calendar className={iconClass} />
                                    <input
                                       name="dob"
                                       value={formData.dob}
                                       onChange={handleChange}
                                       type="date"
                                       className={`${inputClass} [color-scheme:dark]`}
                                    />
                                 </div>
                                 {errors.dob && <div className={errorClass}>{errors.dob}</div>}
                              </div>

                              {/* Email */}
                              <div className="space-y-0.5">
                                 <label className={labelClass}>EMAIL ADDRESS</label>
                                 <div className={inputContainerClass(!!errors.email)}>
                                    <Mail className={iconClass} />
                                    <input
                                       name="email"
                                       value={formData.email}
                                       onChange={handleChange}
                                       type="email"
                                       placeholder="name@example.com"
                                       className={inputClass}
                                    />
                                 </div>
                                 {errors.email && <div className={errorClass}>{errors.email}</div>}
                              </div>

                              {/* Role Dropdown */}
                              <div className="space-y-0.5">
                                 <label className={labelClass}>CURRENT ROLE</label>
                                 <div className={`${inputContainerClass(false)} ring-1 ring-white/5 focus-within:ring-brand-yellow/50`}>
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-yellow"></div>
                                    <ScanLine className={iconClass} />
                                    <select
                                       name="role"
                                       value={formData.role}
                                       onChange={handleChange}
                                       className={selectClass}
                                    >
                                       <option value="Student">Student</option>
                                       <option value="Independent Researcher">Independent Researcher</option>
                                       <option value="Software Engineer">Software Engineer</option>
                                       <option value="Systems Architect">Systems Architect</option>
                                       <option value="Data Scientist">Data Scientist</option>
                                       <option value="Founder">Founder / Executive</option>
                                       <option value="Other">Other</option>
                                    </select>
                                    <ChevronRight className="absolute right-3 top-3 w-3 h-3 text-neutral-500 rotate-90 pointer-events-none" />
                                 </div>
                              </div>

                              {/* CONDITIONAL STUDENT FIELDS */}
                              {formData.role === 'Student' && (
                                 <>
                                    <div className="space-y-0.5 animate-fade-in">
                                       <label className={labelClass}>ACADEMIC LEVEL</label>
                                       <div className={`${inputContainerClass(false)} border-l-2 border-l-brand-yellow/50`}>
                                          <GraduationCap className={iconClass} />
                                          <select
                                             name="studentLevel"
                                             value={formData.studentLevel}
                                             onChange={handleChange}
                                             className={selectClass}
                                          >
                                             <option value="Undergraduate">Undergraduate</option>
                                             <option value="Masters / Graduate">Masters / Graduate</option>
                                             <option value="PhD / Doctorate">PhD / Doctorate</option>
                                             <option value="Post-Doc">Post-Doc</option>
                                          </select>
                                          <ChevronRight className="absolute right-3 top-3 w-3 h-3 text-neutral-500 rotate-90 pointer-events-none" />
                                       </div>
                                    </div>
                                    <div className="space-y-0.5 animate-fade-in">
                                       <label className={labelClass}>DEGREE / MAJOR</label>
                                       <div className={inputContainerClass(!!errors.degree)}>
                                          <BookOpen className={iconClass} />
                                          <input
                                             name="degree"
                                             value={formData.degree}
                                             onChange={handleChange}
                                             type="text"
                                             placeholder="ex. Computer Science"
                                             className={inputClass}
                                          />
                                       </div>
                                       {errors.degree && <div className={errorClass}>{errors.degree}</div>}
                                    </div>
                                 </>
                              )}

                              {/* Organization */}
                              <div className="space-y-0.5 md:col-span-2">
                                 <label className={labelClass}>{formData.role === 'Student' ? 'UNIVERSITY / INSTITUTION' : 'ORGANIZATION'}</label>
                                 <div className={inputContainerClass(!!errors.organization)}>
                                    <Building2 className={iconClass} />
                                    <input
                                       name="organization"
                                       value={formData.organization}
                                       onChange={handleChange}
                                       type="text"
                                       placeholder={formData.role === 'Student' ? "ex. MIT, Stanford, Local University" : "ex. Google, Startup, Self"}
                                       className={inputClass}
                                    />
                                 </div>
                                 {errors.organization && <div className={errorClass}>{errors.organization}</div>}
                              </div>
                           </div>

                           {/* NEW ENHANCED DATA COLLECTION SECTION */}
                           <div className="pt-6 border-t border-white/10">
                              <div className="mb-4 flex items-center gap-2">
                                 <Layers className="w-4 h-4 text-brand-yellow" />
                                 <h3 className="text-sm font-semibold text-white tracking-wide">Tell Us More About You</h3>
                              </div>

                              <div className="space-y-4">
                                 {/* Interest Areas - Multi-select */}
                                 <div className="space-y-2">
                                    <label className={labelClass}>AREAS OF INTEREST (SELECT ALL THAT APPLY)</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                       {[
                                          { value: 'System Design', label: 'System Design' },
                                          { value: 'AI/ML Engineering', label: 'AI/ML Engineering' },
                                          { value: 'Backend Architecture', label: 'Backend Architecture' },
                                          { value: 'Frontend Engineering', label: 'Frontend Engineering' },
                                          { value: 'DevOps/Infrastructure', label: 'DevOps/Infrastructure' },
                                          { value: 'Research & Publications', label: 'Research & Publications' },
                                       ].map((interest) => (
                                          <label
                                             key={interest.value}
                                             className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer group ${formData.interestAreas.includes(interest.value)
                                                ? 'border-brand-yellow/60 bg-brand-yellow/5'
                                                : 'border-white/10 bg-neutral-900/40 hover:bg-neutral-900 hover:border-white/20'
                                                }`}
                                          >
                                             <div className="relative flex items-center justify-center">
                                                <input
                                                   type="checkbox"
                                                   name="interestAreas"
                                                   value={interest.value}
                                                   checked={formData.interestAreas.includes(interest.value)}
                                                   onChange={handleChange}
                                                   className="peer appearance-none w-4 h-4 rounded border border-white/20 bg-black/40 checked:bg-brand-yellow checked:border-brand-yellow transition-all"
                                                />
                                                <CheckCircle2 className="w-3 h-3 text-black absolute opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                                             </div>
                                             <span className={`text-xs transition-colors ${formData.interestAreas.includes(interest.value) ? 'text-white font-medium' : 'text-neutral-400 group-hover:text-neutral-200'
                                                }`}>
                                                {interest.label}
                                             </span>
                                          </label>
                                       ))}
                                    </div>
                                    {errors.interestAreas && <div className={errorClass}>{errors.interestAreas}</div>}
                                 </div>

                                 {/* Experience Level */}
                                 <div className="space-y-0.5">
                                    <label className={labelClass}>EXPERIENCE LEVEL</label>
                                    <div className={`${inputContainerClass(!!errors.experienceLevel)} ring-1 ring-white/5 focus-within:ring-brand-yellow/50`}>
                                       <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-yellow/60"></div>
                                       <GraduationCap className={iconClass} />
                                       <select
                                          name="experienceLevel"
                                          value={formData.experienceLevel}
                                          onChange={handleChange}
                                          className={selectClass}
                                       >
                                          <option value="">Select your experience level</option>
                                          <option value="Beginner (0-2 years)">Beginner (0-2 years)</option>
                                          <option value="Intermediate (2-5 years)">Intermediate (2-5 years)</option>
                                          <option value="Advanced (5-10 years)">Advanced (5-10 years)</option>
                                          <option value="Expert (10+ years)">Expert (10+ years)</option>
                                       </select>
                                       <ChevronRight className="absolute right-3 top-3 w-3 h-3 text-neutral-500 rotate-90 pointer-events-none" />
                                    </div>
                                    {errors.experienceLevel && <div className={errorClass}>{errors.experienceLevel}</div>}
                                 </div>



                                 {/* Motivation - Text Area */}
                                 <div className="space-y-0.5">
                                    <label className={labelClass}>WHAT ARE YOU MOST EXCITED ABOUT? (OPTIONAL)</label>
                                    <div className={inputContainerClass(false)}>
                                       <Edit3 className="absolute left-3 top-3 w-4 h-4 text-neutral-600 group-focus-within:text-brand-yellow transition-colors duration-300 pointer-events-none" />
                                       <textarea
                                          name="motivation"
                                          value={formData.motivation}
                                          onChange={handleChange}
                                          placeholder="Share what excites you about first principles engineering, what you hope to learn, or what you want to build..."
                                          rows={3}
                                          className="w-full bg-transparent border-none py-2.5 pl-10 pr-4 text-base md:text-sm text-white placeholder-neutral-600 focus:ring-0 focus:outline-none transition-all resize-none"
                                       />
                                    </div>
                                    <div className="text-[9px] text-neutral-600 ml-1 mt-1">Help us understand your goals and tailor the experience for you</div>
                                 </div>
                              </div>
                           </div>

                           {/* Compliance Checkboxes - IMPROVED UI */}
                           <div className="pt-2 space-y-3">
                              {/* Privacy Card */}
                              <label className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-neutral-900/40 hover:bg-neutral-900 hover:border-white/10 transition-all cursor-pointer group">
                                 <div className="relative flex items-center justify-center mt-0.5">
                                    <input
                                       type="checkbox"
                                       name="privacy"
                                       checked={formData.privacy}
                                       onChange={handleChange}
                                       className={`peer appearance-none w-5 h-5 rounded border ${errors.privacy ? 'border-red-500' : 'border-white/20'} bg-black/40 checked:bg-brand-yellow checked:border-brand-yellow transition-all`}
                                    />
                                    <CheckCircle2 className="w-3.5 h-3.5 text-black absolute opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                                 </div>
                                 <span className="text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors leading-relaxed">
                                    I accept the <button type="button" onClick={(e) => { e.preventDefault(); setShowPrivacyPolicy(true); }} className="text-brand-yellow underline decoration-brand-yellow/40 underline-offset-2 hover:decoration-brand-yellow transition-colors">Privacy Policy</button> and <button type="button" onClick={(e) => { e.preventDefault(); setShowTermsOfService(true); }} className="text-brand-yellow underline decoration-brand-yellow/40 underline-offset-2 hover:decoration-brand-yellow transition-colors">Terms of Service</button>, and agree to the processing of my research data for lab access credentials.
                                 </span>
                              </label>
                              {errors.privacy && <div className="text-[10px] text-red-400 text-center animate-fade-in">{errors.privacy}</div>}
                           </div>

                           <div className="pt-4 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                              <div className="hidden md:flex items-center gap-2 text-[10px] text-neutral-600 font-mono tracking-wider">
                                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                 SECURE CONNECTION
                              </div>
                              <button
                                 type="submit"
                                 disabled={isSubmitting}
                                 className="w-full md:w-auto mb-5 px-8 py-3 bg-brand-white text-black text-sm font-bold tracking-wide rounded-full hover:bg-brand-yellow 
                                 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center 
                                 justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,230,0,0.3)]"
                              >
                                 {isSubmitting ? 'Processing Request...' : 'Generate Identity'}
                                 {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                              </button>
                           </div>
                        </form>
                     </div>
                  ) : (
                     <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-reveal p-6">
                        <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-4 border border-green-500/20 shadow-[0_0_40px_rgba(34,197,94,0.1)]">
                           <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <div className="space-y-2">
                           <h3 className="text-4xl font-display font-medium text-white">You're On The List!</h3>
                           <p className="text-neutral-400 max-w-md mx-auto text-sm leading-relaxed">
                              Welcome to the Node, <span className="text-white font-medium">{formData.name}</span>. Your early access request has been received.
                           </p>
                        </div>



                        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                           <a href="https://x.com/mfourlabs" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-3 p-4 rounded-xl bg-neutral-800 text-white hover:bg-neutral-700 transition-all border border-white/10">
                              <X className="w-5 h-5" />
                              <span className="font-medium">Follow on X</span>
                           </a>
                           <a href="https://www.linkedin.com/company/mfourlabs" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-3 p-4 rounded-xl bg-[#0A66C2] text-white hover:bg-[#004182] transition-all shadow-lg shadow-[#0A66C2]/20">
                              <Linkedin className="w-5 h-5" />
                              <span className="font-bold">Connect on LinkedIn</span>
                           </a>
                        </div>

                        {/* GDPR Data Management Link */}
                        <button
                           onClick={() => setShowGDPRManagement(true)}
                           className="text-xs text-neutral-500 hover:text-brand-yellow transition-colors underline decoration-neutral-600 underline-offset-2 hover:decoration-brand-yellow"
                        >
                           Manage My Data (GDPR)
                        </button>

                        {/* Reset Registration Button (for testing) */}
                        <button
                           onClick={() => {
                              if (confirm('Clear your registration and start over? This is for testing purposes only.')) {
                                 localStorage.removeItem('ment4ai_lab_access_id');
                                 localStorage.removeItem('ment4ai_lab_user_name');
                                 localStorage.removeItem('ment4ai_lab_waitlist_position');
                                 setStep(1);
                                 setMobileTab('form');
                                 setAccessId(Math.random().toString(36).substring(2, 10).toUpperCase());
                              }
                           }}
                           className="text-xs text-orange-500 hover:text-orange-400 transition-colors underline decoration-orange-600 underline-offset-2 hover:decoration-orange-400"
                        >
                           Reset Registration (Testing)
                        </button>

                        <div className="text-[10px] font-mono text-neutral-600 mt-8 border px-4 py-2 rounded-full border-white/5">
                           ACCESS ID: <span className="text-neutral-400">{accessId}</span>
                        </div>
                     </div>
                  )}
               </div>
            </div>

            {/* RIGHT PANEL: 3D Digital ID Preview (Premium iOS Aesthetic) */}
            <div className={`
            md:w-[500px] bg-[#020202] relative flex flex-col items-center justify-center p-6 md:p-12 border-l border-white/5 overflow-hidden
            ${mobileTab === 'preview' ? 'flex-1 flex z-20' : 'hidden md:flex'}
        `}>

               {/* Environmental Lighting/Effects */}
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,15,15,1),rgba(0,0,0,1))]"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-yellow/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>

               {/* 3D Scene Container */}
               <div className="relative z-10 w-full max-w-[340px] perspective-[1200px] group">

                  {/* THE CARD */}
                  <div className="relative w-full aspect-[1.586/1] transition-all duration-700 ease-out transform-style-3d 
                              rotate-x-[10deg] rotate-y-[-10deg] group-hover:rotate-x-[0deg] group-hover:rotate-y-[0deg] group-hover:scale-105
                              animate-float cursor-default">

                     {/* Card Front */}
                     <div className="absolute inset-0 bg-neutral-900 rounded-[20px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] border border-white/10 flex flex-col backface-hidden ring-1 ring-white/5">

                        {/* Premium Texture / Noise */}
                        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')]"></div>

                        {/* Ment4AI Yellow Accent Line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-brand-yellow shadow-[0_0_15px_rgba(255,230,0,0.5)]"></div>

                        {/* Card Content */}
                        <div className="relative z-10 p-6 h-full flex flex-col justify-between">

                           {/* Header */}
                           <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                 {/* Minimalist M4 Logo */}
                                 <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-display font-bold text-sm shadow-lg">M4</div>
                                 <div>
                                    <div className="text-[9px] font-bold text-brand-yellow uppercase tracking-widest mb-0.5">Early Access</div>
                                    <div className="text-xs font-semibold text-white tracking-tight">MVF CLI (beta)</div>
                                 </div>
                              </div>

                              {/* Realistic Chip */}
                              <div className="w-11 h-8 rounded-md bg-gradient-to-br from-neutral-200 via-neutral-400 to-neutral-500 border border-white/20 relative overflow-hidden shadow-inner">
                                 <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_45%,rgba(255,255,255,0.4)_50%,transparent_55%)] opacity-50"></div>
                                 <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/30"></div>
                                 <div className="absolute top-0 bottom-0 left-1/3 w-[1px] bg-black/30"></div>
                                 <div className="absolute top-0 bottom-0 right-1/3 w-[1px] bg-black/30"></div>
                              </div>
                           </div>

                           {/* Body - User Identity */}
                           <div className="mt-2">
                              <div className="flex items-center gap-2 mb-1 opacity-80">
                                 <ScanLine className="w-3 h-3 text-brand-yellow" />
                                 <span className="text-[9px] font-mono text-neutral-300 uppercase tracking-widest">{formData.role || 'System Architect'}</span>
                              </div>
                              <h3 className="text-2xl md:text-3xl font-display font-semibold text-white tracking-tight leading-none truncate drop-shadow-md">
                                 {formData.name || 'Member Name'}
                              </h3>
                              <p className="text-[10px] text-neutral-400 mt-1 font-medium truncate">
                                 {formData.organization || 'Research Division'}
                              </p>
                           </div>

                           {/* Footer - Metadata */}
                           <div className="flex items-end justify-between pt-4 border-t border-white/5">
                              <div className="flex gap-6">
                                 <div>
                                    <div className="text-[7px] uppercase tracking-widest text-neutral-500 mb-0.5">Issued</div>
                                    <div className="font-mono text-[10px] text-neutral-300">2025</div>
                                 </div>
                                 <div>
                                    <div className="text-[7px] uppercase tracking-widest text-neutral-500 mb-0.5">ID Ref</div>
                                    <div className="font-mono text-[10px] text-neutral-300">{accessId}</div>
                                 </div>
                              </div>

                              {/* Holographic Patch */}
                              <div className="w-8 h-8 rounded bg-gradient-to-br from-brand-yellow/20 to-purple-500/20 border border-white/10 flex items-center justify-center relative overflow-hidden">
                                 <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.3),transparent)]"></div>
                                 <QrCode className="w-5 h-5 text-white/80" />
                              </div>
                           </div>
                        </div>

                        {/* Glossy Overlay (Apple Style) */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/40 pointer-events-none mix-blend-overlay"></div>

                        {/* Dynamic Reflection */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-shine pointer-events-none"></div>
                     </div>

                     {/* Card Thickness (Pseudo-3D Edge) */}
                     <div className="absolute inset-0 rounded-[20px] bg-white/10 translate-z-[-2px] blur-[1px]"></div>
                  </div>

                  {/* Floor Shadow */}
                  <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-[70%] h-6 bg-brand-yellow/20 blur-[30px] rounded-[100%] transition-all duration-700 group-hover:w-[85%] group-hover:bg-brand-yellow/30"></div>

                  {/* Status Indicator */}
                  <div className="mt-16 text-center space-y-2">
                     <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-white/10 backdrop-blur-md shadow-lg">
                        <div className={`w-1.5 h-1.5 rounded-full ${step === 2 ? 'bg-green-500' : 'bg-brand-yellow'} animate-pulse`}></div>
                        <span className="text-[10px] font-mono text-neutral-400 font-medium tracking-wider">
                           {step === 1 ? 'LIVE PREVIEW' : 'ISSUED'}
                        </span>
                     </div>
                  </div>

               </div>
            </div>

         </div>

         {/* CSS for 3D Float Animation */}
         <style>{`
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .perspective-[1200px] { perspective: 1200px; }
        
        @keyframes float {
          0%, 100% { transform: rotateY(-10deg) rotateX(5deg) translateY(0); }
          50% { transform: rotateY(-10deg) rotateX(5deg) translateY(-10px); }
        }

        @keyframes shine {
          0% { transform: translateX(-150%) skewX(-12deg); }
          50%, 100% { transform: translateX(150%) skewX(-12deg); }
        }

        @keyframes shrink {
          0% { width: 100%; }
          100% { width: 0%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-shine {
            animation: shine 4s ease-in-out infinite;
        }
        
        /* Hover state stops animation and resets to flat for inspection */
        .group:hover .animate-float {
          animation-play-state: paused;
          transform: rotateY(0) rotateX(0) translateY(0) scale(1.05);
        }
      `}</style>

         {/* Toast Notification */}
         {toastMessage && (
            <div className={`fixed bottom-8 left-8 right-8 md:bottom-auto md:top-8 md:left-auto md:right-8 max-w-md z-[70] animate-fade-in transition-all duration-300 ${toastMessage.type === 'success'
               ? 'bg-green-500/20 border border-green-500/50 text-green-300'
               : 'bg-red-500/20 border border-red-500/50 text-red-300'
               } p-4 rounded-xl flex items-center gap-3 backdrop-blur-md shadow-lg`}>
               {toastMessage.type === 'success' ? (
                  <Check className="w-5 h-5 flex-shrink-0 text-green-400" />
               ) : (
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-400" />
               )}
               <span className="text-sm font-medium">{toastMessage.message}</span>
               <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-500 to-brand-yellow animate-pulse rounded-full" style={{
                  width: '100%',
                  animation: 'shrink 3s ease-in forwards'
               }}></div>
            </div>
         )}

         {/* Privacy Policy Modal */}
         {showPrivacyPolicy && <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} />}

         {/* Terms of Service Modal */}
         {showTermsOfService && <TermsOfService onClose={() => setShowTermsOfService(false)} />}

         {/* GDPR Data Management Modal */}
         {showGDPRManagement && <GDPRDataManagement onClose={() => setShowGDPRManagement(false)} userEmail={formData.email} />}
      </div>
   );
};

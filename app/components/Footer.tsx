import { Search, MapPin, Phone, Clock, Package, AlertCircle, TrendingUp, Mail, Building2, User, Shield, Star, CheckCircle, Navigation, MessageCircle, Globe } from 'lucide-react'

export default function Footer() {
  return (
         <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-16">
           <div className="max-w-7xl mx-auto px-4 py-12">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
               {/* Company Info */}
               <div className="space-y-4">
                 <div className="flex items-center space-x-3">
                   <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                     <Package className="w-6 h-6 text-white" />
                   </div>
                   <h3 className="text-xl font-bold">Pharma247</h3>
                 </div>
                 <p className="text-slate-400 text-sm leading-relaxed">
                   Manage your pharmacy anytime, anywhere with Pharma24*7's cloud-based software, Chemist App & Patient App. Automate billing, inventory, online orders, GST reports, and customer engagement seamlessly. Stay connected and grow your business with ease!
                 </p>
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                     <Globe className="w-4 h-4" />
                   </div>
                   <div className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                     <MessageCircle className="w-4 h-4" />
                   </div>
                   <div className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                     <Mail className="w-4 h-4" />
                   </div>
                 </div>
               </div>
   
               {/* Quick Links */}
               <div>
                 <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                 <ul className="space-y-2">
                   {['Search Medicines', 'Browse Wholesalers', 'How It Works', 'Pricing', 'About Us'].map((link) => (
                     <li key={link}>
                       <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                         {link}
                       </a>
                     </li>
                   ))}
                 </ul>
               </div>
   
               {/* Contact */}
               <div>
                 <h4 className="font-bold text-lg mb-4">Contact Us</h4>
                 <div className="space-y-3">
                   <div className="flex items-start space-x-3">
                     <Mail className="w-5 h-5 text-blue-400 mt-0.5" />
                     <div>
                       <div className="text-sm text-slate-400">Email</div>
                       <div className="text-sm font-medium">inquiry@pharma247.in</div>
                     </div>
                   </div>
                   <div className="flex items-start space-x-3">
                     <Phone className="w-5 h-5 text-green-400 mt-0.5" />
                     <div>
                       <div className="text-sm text-slate-400">Phone</div>
                       <div className="text-sm font-medium">+91 908 111 247</div>
                     </div>
                   </div>
                   <div className="flex items-start space-x-3">
                     <MapPin className="w-5 h-5 text-orange-400 mt-0.5" />
                     <div>
                       <div className="text-sm text-slate-400">Address</div>
                       <div className="text-sm font-medium">SF-14/B,DHARTI CITY COMPLEX ,KADI 382715</div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
   
             {/* Bottom Bar */}
             <div className="border-t border-slate-700 pt-8">
               <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                 <div className="text-slate-400 text-sm text-center md:text-left">
                   © 2026 Pharma247. All rights reserved. | High Performance Wholesaler Inventory System
                 </div>
                 <div className="flex items-center space-x-6 text-sm">
                   <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
                   <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a>
                   <a href="#" className="text-slate-400 hover:text-white transition-colors">Cookie Policy</a>
                 </div>
               </div>
             </div>
           </div>
         </footer>
  );
}

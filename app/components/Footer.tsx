import { MapPin, Phone, Package, Mail, MessageCircle, Globe } from 'lucide-react'
import CalendlyPopupButton from './CalendlyPopupButton';

export default function Footer() {
  const links = [
    { label: 'Become Wholesaler', href: 'https://wholesale.pharma247.in/register' },
    { label: 'Pharma Software', href: 'https://pharma247.in/' },
    { label: 'My Sehat Points', href: 'https://mysehatpoint.com/' },
    { label: 'Contact Us', href: 'https://pharma247.in/contact-us' },
    { label: 'About Us', href: 'https://pharma247.in/about-us' },
    { label: 'Privacy Policies', href: 'https://pharma247.in/privacy-policys' },
    { label: 'Terms & Condition', href: 'https://pharma247.in/term-conditions' },
  ]

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
               <img
                  src="/pharmalogo.webp"
                  alt="Pharma247"
                  className="h-10 sm:h-14 w-auto  bg-white p-1 rounded-lg"
                />

            
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Manage your pharmacy anytime, anywhere with Pharma24*7's cloud-based software, Chemist App & Patient App. Automate billing, inventory, online orders, GST reports, and customer engagement seamlessly. Stay connected and grow your business with ease!
            </p>
            <div className="flex items-center space-x-3">

              <CalendlyPopupButton />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {links.map(({ label, href }) => (

                <li key={label}>
                  <a
                    href={href} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {label}
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
              © 2026 Pharma247. All rights reserved. | retail pharmacy billing software
            </div>

          </div>
        </div>



      </div>
    </footer>
  );
}

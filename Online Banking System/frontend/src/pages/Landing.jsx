import { Link } from 'react-router-dom'
import { FiCreditCard, FiSend, FiUsers, FiLock, FiArrowRight, FiShield, FiZap, FiGlobe } from 'react-icons/fi'

export default function Landing() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-lg shadow-primary-200">
              <FiCreditCard className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold gradient-text">BankApp</span>
          </div>
          <div className="flex gap-3">
            <Link to="/login" className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-primary-600 transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl hover:from-primary-700 hover:to-primary-800 shadow-lg shadow-primary-200 transition-all hover:scale-105">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-success-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-warning-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium mb-8 animate-fade-in">
              <FiZap size={16} />
              <span>Modern Banking Made Simple</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight animate-slide-up">
              Banking Made{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-primary-700 to-success-600">
                  Simple
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 8C50 2 150 2 198 8" stroke="#4c6ef5" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience secure, fast, and convenient online banking from anywhere in the world.
              Manage your finances with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl font-semibold text-lg shadow-xl shadow-primary-200 hover:shadow-2xl hover:shadow-primary-300 transition-all hover:scale-105 flex items-center gap-2"
              >
                Open Free Account
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-2xl font-semibold text-lg hover:border-primary-300 hover:text-primary-700 transition-all"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-20 lg:mb-32">
            {[
              { label: 'Active Users', value: '10K+', icon: FiUsers },
              { label: 'Transactions', value: '$5M+', icon: FiSend },
              { label: 'Security', value: '256-bit', icon: FiLock },
              { label: 'Countries', value: '50+', icon: FiGlobe },
            ].map((stat, idx) => (
              <div key={idx} className="card p-6 text-center hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-primary-600">
                  <stat.icon size={24} />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: FiCreditCard,
                title: 'Account Management',
                desc: 'View balances, track transactions, and manage your accounts with ease using our intuitive dashboard.',
                color: 'from-primary-500 to-primary-600',
                bg: 'from-primary-50 to-primary-100/50',
              },
              {
                icon: FiSend,
                title: 'Quick Transfers',
                desc: 'Send money to friends and family instantly with secure transfers and real-time notifications.',
                color: 'from-success-500 to-success-600',
                bg: 'from-success-50 to-success-100/50',
              },
              {
                icon: FiUsers,
                title: 'Beneficiaries',
                desc: 'Save your frequent recipients for faster future transfers. Manage them all in one place.',
                color: 'from-warning-500 to-warning-600',
                bg: 'from-warning-50 to-warning-100/50',
              },
            ].map((feature, idx) => (
              <div key={idx} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bg} rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300`}></div>
                <div className="relative card p-8 h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Security Section */}
          <div className="mt-20 lg:mt-32">
            <div className="card p-8 lg:p-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="relative grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-primary-200 text-xs font-medium mb-4">
                    <FiShield size={14} />
                    Bank-Level Security
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">Your money is safe with us</h2>
                  <p className="text-gray-300 text-lg mb-6">
                    We use industry-leading security measures to protect your financial data and transactions.
                  </p>
                  <ul className="space-y-3">
                    {['256-bit SSL Encryption', 'Two-Factor Authentication', 'Real-time Fraud Monitoring', 'Secure File Storage'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300">
                        <div className="w-5 h-5 rounded-full bg-success-500/20 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-success-400"></div>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Uptime', value: '99.9%' },
                    { label: 'Encryption', value: 'AES-256' },
                    { label: 'Support', value: '24/7' },
                    { label: 'Compliance', value: 'PCI DSS' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <p className="text-3xl font-bold text-white mb-1">{item.value}</p>
                      <p className="text-sm text-gray-400">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
              <FiCreditCard className="text-white" size={18} />
            </div>
            <span className="text-xl font-bold gradient-text">BankApp</span>
          </div>
          <p className="text-gray-500 text-sm">
            Online Banking System - Capstone Project. Built with React, Node.js, Express, and MongoDB.
          </p>
        </div>
      </footer>
    </div>
  )
}

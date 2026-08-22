import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.jsx'
import AdminLayout from '../layouts/AdminLayout.jsx'
import ProtectedRoute from '../admin/components/ProtectedRoute.jsx'

import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import Services from '../pages/Services.jsx'
import ServiceDetail from '../pages/ServiceDetail.jsx'
import Team from '../pages/Team.jsx'
import TeamMemberDetail from '../pages/TeamMemberDetail.jsx'
import Testimonials from '../pages/Testimonials.jsx'
import Blog from '../pages/Blog.jsx'
import BlogDetail from '../pages/BlogDetail.jsx'
import FAQ from '../pages/FAQ.jsx'
import Contact from '../pages/Contact.jsx'
import NotFound from '../pages/NotFound.jsx'
import PrivacyPolicy from '../pages/PrivacyPolicy.jsx'
import TermsConditions from '../pages/TermsConditions.jsx'

import Login from '../admin/pages/Login.jsx'
import Dashboard from '../admin/pages/Dashboard.jsx'
import ServicesManager from '../admin/pages/ServicesManager.jsx'
import TeamManager from '../admin/pages/TeamManager.jsx'
import TestimonialsManager from '../admin/pages/TestimonialsManager.jsx'
import BlogManager from '../admin/pages/BlogManager.jsx'
import BlogEditor from '../admin/pages/BlogEditor.jsx'
import FAQManager from '../admin/pages/FAQManager.jsx'
import StatisticsManager from '../admin/pages/StatisticsManager.jsx'
import ConditionsManager from '../admin/pages/ConditionsManager.jsx'
import EnquiriesManager from '../admin/pages/EnquiriesManager.jsx'
import SettingsManager from '../admin/pages/SettingsManager.jsx'
import HomepageManager from '../admin/pages/HomepageManager.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/team" element={<Team />} />
        <Route path="/team/:slug" element={<TeamMemberDetail />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/admin/login" element={<Login />} />

      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="homepage" element={<HomepageManager />} />
          <Route path="services" element={<ServicesManager />} />
          <Route path="conditions" element={<ConditionsManager />} />
          <Route path="team" element={<TeamManager />} />
          <Route path="testimonials" element={<TestimonialsManager />} />
          <Route path="blog" element={<BlogManager />} />
          <Route path="blog/new" element={<BlogEditor />} />
          <Route path="blog/:id/edit" element={<BlogEditor />} />
          <Route path="faq" element={<FAQManager />} />
          <Route path="statistics" element={<StatisticsManager />} />
          <Route path="settings" element={<SettingsManager />} />
          <Route path="website-settings" element={<SettingsManager />} />
          <Route path="enquiries" element={<EnquiriesManager />} />
        </Route>
      </Route>
    </Routes>
  )
}

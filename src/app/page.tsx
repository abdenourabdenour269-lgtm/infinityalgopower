'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Header } from '@/components/Header'
import { SignalsSection } from '@/components/SignalsSection'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import {
  TrendingUp,
  Bot,
  GraduationCap,
  Shield,
  HeadphonesIcon,
  RefreshCw,
  Users,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Star,
  Zap,
  Target,
  BarChart3,
  CandlestickChart,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Youtube,
  Twitter,
  Send
} from 'lucide-react'

const portalUrl = 'https://infinityalgoacademy.net/portal/'
const communityUrl = 'https://infinityalgoacademy.net/community/'

export default function Home() {
  const { t, language, dir, isArabic } = useLanguage()
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight

  const mainProducts = [
    {
      icon: TrendingUp,
      title: t.indicators.title,
      subtitle: t.indicators.subtitle,
      description: t.indicators.description,
      features: [t.indicators.feature1, t.indicators.feature2, t.indicators.feature3],
      color: 'from-amber-500 to-orange-600',
      cta: t.indicators.cta
    },
    {
      icon: Bot,
      title: t.robots.title,
      subtitle: t.robots.subtitle,
      description: t.robots.description,
      features: [t.robots.feature1, t.robots.feature2, t.robots.feature3],
      color: 'from-emerald-500 to-teal-600',
      cta: t.robots.cta
    },
    {
      icon: GraduationCap,
      title: t.courses.title,
      subtitle: t.courses.subtitle,
      description: t.courses.description,
      features: [t.courses.feature1, t.courses.feature2, t.courses.feature3],
      color: 'from-blue-500 to-indigo-600',
      cta: t.courses.cta
    }
  ]

  const featuredProducts = [
    {
      title: 'ICT Entry V1',
      category: t.featured.category_indicator,
      price: '$149',
      originalPrice: '$199',
      rating: 4.9,
      reviews: 328,
      image: '📊',
      badge: t.featured.badge_bestseller,
      badgeColor: 'bg-amber-500'
    },
    {
      title: 'Buy Sell Magic Indicator',
      category: t.featured.category_indicator,
      price: '$99',
      originalPrice: '$149',
      rating: 4.8,
      reviews: 256,
      image: '🎯',
      badge: t.featured.badge_discount,
      badgeColor: 'bg-emerald-500'
    },
    {
      title: 'Smart Money Concept',
      category: t.featured.category_indicator,
      price: '$129',
      originalPrice: '$179',
      rating: 4.7,
      reviews: 189,
      image: '💹',
      badge: t.featured.badge_new,
      badgeColor: 'bg-blue-500'
    },
    {
      title: 'AI Trading Bot',
      category: t.featured.category_robot,
      price: '$299',
      originalPrice: '$399',
      rating: 4.9,
      reviews: 145,
      image: '🤖',
      badge: t.featured.badge_ai,
      badgeColor: 'bg-purple-500'
    },
    {
      title: 'Premium Course Bundle',
      category: t.featured.category_course,
      price: '$199',
      originalPrice: '$349',
      rating: 4.8,
      reviews: 412,
      image: '📚',
      badge: t.featured.badge_special,
      badgeColor: 'bg-rose-500'
    },
    {
      title: 'FVG Indicator',
      category: t.featured.category_indicator,
      price: '$89',
      originalPrice: '$129',
      rating: 4.6,
      reviews: 178,
      image: '📈',
      badge: t.featured.badge_popular,
      badgeColor: 'bg-cyan-500'
    }
  ]

  const features = [
    {
      icon: Shield,
      title: t.features.tested_title,
      description: t.features.tested_desc
    },
    {
      icon: HeadphonesIcon,
      title: t.features.support_title,
      description: t.features.support_desc
    },
    {
      icon: RefreshCw,
      title: t.features.updates_title,
      description: t.features.updates_desc
    },
    {
      icon: Users,
      title: t.features.community_title,
      description: t.features.community_desc
    }
  ]

  const stats = [
    { value: '+15,000', label: t.stats.clients },
    { value: '+50', label: t.stats.products },
    { value: '98%', label: t.stats.satisfaction },
    { value: '24/7', label: t.stats.support }
  ]

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero-gradient min-h-[90vh] flex items-center pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-pattern opacity-50"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text Content */}
            <div className="flex-1 max-w-2xl text-center lg:text-right">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8 animate-fade-in-up">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="text-amber-400 text-sm font-medium">{t.hero.badge}</span>
              </div>
              
              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <span className="text-foreground">{t.hero.title1} </span>
                <span className="text-gold-gradient">{t.hero.title2}</span>
                <br />
                <span className="text-foreground">{t.hero.title3}</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                {t.hero.subtitle}
              </p>
              
              {/* CTA Buttons */}
              <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up`} style={{ animationDelay: '0.3s' }}>
                <Button
                  size="lg"
                  className="btn-gold px-8 py-6 text-lg font-semibold rounded-xl glow-gold"
                  onClick={() => window.open(portalUrl, '_blank')}
                >
                  {t.hero.cta_explore}
                  <ArrowIcon className={`${isArabic ? 'mr' : 'ml'}-2 h-5 w-5`} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="btn-outline-gold px-8 py-6 text-lg font-semibold rounded-xl"
                  onClick={() => window.open(portalUrl, '_blank')}
                >
                  {t.hero.cta_academy}
                  <GraduationCap className={`${isArabic ? 'mr' : 'ml'}-2 h-5 w-5`} />
                </Button>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="flex-1 max-w-xl lg:max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl blur-2xl"></div>
                {/* Image Container */}
                <div className="relative rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl">
                  <img 
                    src="/images/trading-hero.png" 
                    alt="Professional Trading Platform" 
                    className="w-full h-auto object-cover"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-4 bg-card/90 backdrop-blur-sm rounded-xl p-4 border border-amber-500/20 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Live Signals</div>
                      <div className="text-xs text-emerald-400">+85% Accuracy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-card/30 rounded-xl border border-amber-500/10">
                <div className="text-3xl md:text-4xl font-bold text-gold-gradient mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-amber-500/50 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-amber-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Main Products Section */}
      <section className="py-20 bg-trading-gradient relative">
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 mb-4">
              {t.categories.badge}
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-gold-gradient">{t.categories.title1}</span>
              <span className="text-foreground"> {t.categories.title2}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t.categories.subtitle}
            </p>
          </div>
          
          {/* Products Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {mainProducts.map((product, index) => (
              <Card
                key={index}
                className="card-hover bg-card/50 backdrop-blur-sm border-amber-500/10 overflow-hidden group"
              >
                <CardHeader className="relative">
                  <div className={`absolute top-0 ${isArabic ? 'right' : 'left'}-0 w-32 h-32 bg-gradient-to-br ${product.color} opacity-10 rounded-full ${isArabic ? '-translate-y-1/2 translate-x-1/2' : '-translate-y-1/2 -translate-x-1/2'} group-hover:scale-150 transition-transform duration-500`}></div>
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${product.color} w-fit mb-4 glow-gold`}>
                    <product.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">{product.title}</CardTitle>
                  <CardDescription className="text-amber-400 font-medium">{product.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>
                  <ul className="space-y-3">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full btn-gold font-semibold"
                    onClick={() => window.open(portalUrl, '_blank')}
                  >
                    {product.cta}
                    <ArrowIcon className={`${isArabic ? 'mr' : 'ml'}-2 h-4 w-4`} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-background relative">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 mb-4">
              <Star className="w-3 h-3 ml-1" />
              {t.featured.badge}
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">{t.featured.title1} </span>
              <span className="text-gold-gradient">{t.featured.title2}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t.featured.subtitle}
            </p>
          </div>
          
          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <Card
                key={index}
                className="card-hover bg-card/50 backdrop-blur-sm border-amber-500/10 overflow-hidden group"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{product.image}</div>
                    <Badge className={`${product.badgeColor} text-white text-xs`}>
                      {product.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">{product.title}</CardTitle>
                  <CardDescription className="text-amber-400 text-sm">{product.category}</CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-500 fill-amber-500' : 'text-muted'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews} {t.featured.reviews})
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gold-gradient">{product.price}</span>
                    <span className="text-muted-foreground line-through text-sm">{product.originalPrice}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    className="w-full btn-gold font-semibold"
                    onClick={() => window.open(portalUrl, '_blank')}
                  >
                    {t.featured.buyNow}
                    <ArrowIcon className={`${isArabic ? 'mr' : 'ml'}-2 h-4 w-4`} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {/* View All Button */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="btn-outline-gold px-8 py-6 text-lg font-semibold rounded-xl"
              onClick={() => window.open(portalUrl, '_blank')}
            >
              {t.featured.viewAll}
              <ExternalLink className={`${isArabic ? 'mr' : 'ml'}-2 h-5 w-5`} />
            </Button>
          </div>
        </div>
      </section>

      {/* Trading Signals Section */}
      <SignalsSection />

      {/* Features Section */}
      <section className="py-20 bg-trading-gradient relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 mb-4">
              <Shield className="w-3 h-3 ml-1" />
              {t.features.badge}
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">{t.features.title1} </span>
              <span className="text-gold-gradient">{t.features.title2}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t.features.subtitle}
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-amber-500/10 card-hover"
              >
                <div className="inline-flex p-4 rounded-2xl bg-amber-500/10 mb-6">
                  <feature.icon className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portal Access Section */}
      <section className="py-20 bg-background relative">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-card via-card to-amber-500/5 border-amber-500/20 overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className={`flex flex-col md:flex-row items-center gap-8 ${isArabic ? '' : 'md:flex-row-reverse'}`}>
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center glow-gold animate-pulse-gold">
                      <Target className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className={`flex-1 ${isArabic ? 'text-right' : 'text-left'}`}>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      {t.portal.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {t.portal.description}
                    </p>
                    <div className={`flex flex-col sm:flex-row gap-4 ${isArabic ? 'justify-start' : 'justify-start'}`}>
                      <Button
                        size="lg"
                        className="btn-gold font-semibold"
                        onClick={() => window.open(portalUrl, '_blank')}
                      >
                        {t.portal.loginBtn}
                        <ExternalLink className={`${isArabic ? 'mr' : 'ml'}-2 h-5 w-5`} />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="btn-outline-gold font-semibold"
                        onClick={() => window.open(communityUrl, '_blank')}
                      >
                        {t.portal.communityBtn}
                        <Users className={`${isArabic ? 'mr' : 'ml'}-2 h-5 w-5`} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Quick Links */}
          <div className="grid sm:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 rounded-xl bg-card/50 border border-amber-500/10 card-hover group"
            >
              <div className="p-3 rounded-xl bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                <HeadphonesIcon className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{t.quickLinks.support_title}</h4>
                <p className="text-sm text-muted-foreground">{t.quickLinks.support_subtitle}</p>
              </div>
            </a>
            
            <a
              href={communityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 rounded-xl bg-card/50 border border-amber-500/10 card-hover group"
            >
              <div className="p-3 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                <MessageCircle className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{t.quickLinks.community_title}</h4>
                <p className="text-sm text-muted-foreground">{t.quickLinks.community_subtitle}</p>
              </div>
            </a>
            
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 rounded-xl bg-card/50 border border-amber-500/10 card-hover group"
            >
              <div className="p-3 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                <BarChart3 className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{t.quickLinks.store_title}</h4>
                <p className="text-sm text-muted-foreground">{t.quickLinks.store_subtitle}</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-trading-gradient relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-orange-500/10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">{t.cta.title} </span>
              <span className="text-gold-gradient">{t.cta.title2}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              {t.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="btn-gold px-10 py-7 text-lg font-semibold rounded-xl glow-gold"
                onClick={() => window.open(portalUrl, '_blank')}
              >
                {t.cta.startBtn}
                <ArrowIcon className={`${isArabic ? 'mr' : 'ml'}-2 h-5 w-5`} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="btn-outline-gold px-10 py-7 text-lg font-semibold rounded-xl"
                onClick={() => window.open(communityUrl, '_blank')}
              >
                {t.cta.contactBtn}
                <MessageCircle className={`${isArabic ? 'mr' : 'ml'}-2 h-5 w-5`} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-amber-500/10 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <CandlestickChart className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gold-gradient">InfinityAlgoPower</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {t.footer.description}
              </p>
              <div className="flex gap-3">
                <a
                  href={communityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center hover:bg-amber-500/20 transition-colors"
                >
                  <Send className="w-5 h-5 text-amber-500" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center hover:bg-amber-500/20 transition-colors"
                >
                  <Youtube className="w-5 h-5 text-amber-500" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center hover:bg-amber-500/20 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-amber-500" />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">{t.footer.quickLinks}</h4>
              <ul className="space-y-3">
                <li>
                  <a href={portalUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-amber-400 transition-colors">
                    {t.footer.store}
                  </a>
                </li>
                <li>
                  <a href={portalUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-amber-400 transition-colors">
                    {t.indicators.title}
                  </a>
                </li>
                <li>
                  <a href={portalUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-amber-400 transition-colors">
                    {t.robots.title}
                  </a>
                </li>
                <li>
                  <a href={portalUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-amber-400 transition-colors">
                    {t.courses.title}
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">{t.footer.supportTitle}</h4>
              <ul className="space-y-3">
                <li>
                  <a href={portalUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-amber-400 transition-colors">
                    {t.footer.helpCenter}
                  </a>
                </li>
                <li>
                  <a href={communityUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-amber-400 transition-colors">
                    {t.footer.community}
                  </a>
                </li>
                <li>
                  <a href={portalUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-amber-400 transition-colors">
                    {t.footer.faq}
                  </a>
                </li>
                <li>
                  <a href={portalUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-amber-400 transition-colors">
                    {t.footer.refundPolicy}
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">{t.footer.contact}</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>support@infinityalgoacademy.net</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span dir="ltr">+1 234 567 890</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>{t.footer.location}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <Separator className="bg-amber-500/10 mb-8" />
          
          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} InfinityAlgoPower. {t.footer.copyright}</p>
            <div className="flex gap-6">
              <a href={portalUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                {t.footer.terms}
              </a>
              <a href={portalUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                {t.footer.privacy}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

import React from 'react';

const Pricing = () => {
  const pricingPlans = [
    {
      id: 1,
      name: 'Basic',
      price: 29,
      period: 'month',
      popular: false,
      description: 'Perfect for beginners starting their fitness journey',
      features: [
        'Gym Access (6am - 10pm)',
        'Basic Equipment Usage',
        'Locker Room Access',
        'Free Fitness Assessment',
        'Mobile App Access',
        'Community Support'
      ],
      buttonText: 'Get Started'
    },
    {
      id: 2,
      name: 'Premium',
      price: 59,
      period: 'month',
      popular: true,
      description: 'Most popular choice for serious fitness enthusiasts',
      features: [
        '24/7 Gym Access',
        'All Equipment & Classes',
        'Personal Training (2 sessions)',
        'Nutrition Consultation',
        'Guest Pass (2 per month)',
        'Premium Mobile Features',
        'Towel Service',
        'Free Parking'
      ],
      buttonText: 'Most Popular'
    },
    {
      id: 3,
      name: 'Elite',
      price: 99,
      period: 'month',
      popular: false,
      description: 'Ultimate package for maximum results and luxury',
      features: [
        '24/7 VIP Gym Access',
        'Unlimited Personal Training',
        'Custom Meal Plans',
        'Recovery & Spa Services',
        'Unlimited Guest Passes',
        'Priority Class Booking',
        'Dedicated Locker',
        'Concierge Service',
        'Supplement Discounts'
      ],
      buttonText: 'Go Elite'
    }
  ];

  return (
    <section id="pricing" className="section bg-gray-50">
      <div className="container">
        <h2 className="section-title">Membership Plans</h2>
        <p className="section-subtitle">
          Choose the perfect plan that fits your fitness goals and lifestyle
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'transform scale-105 border-2 border-harvest-gold' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-primary text-black text-center py-2 font-bold text-sm">
                  Most Popular
                </div>
              )}
              
              <div className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                <div className="text-center mb-8">
                  <h3 className="font-oswald font-bold text-2xl mb-2 text-black-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-2xl font-bold text-gray-500">$</span>
                    <span className="text-5xl font-oswald font-bold text-black-2">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 ml-1">/{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="text-harvest-gold mr-3 font-bold text-lg">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="#contact" 
                  className={`btn w-full text-center ${
                    plan.popular ? '' : 'btn-outline'
                  }`}
                >
                  {plan.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 max-w-2xl mx-auto">
          <p className="text-gray-700 mb-2">
            <strong>No commitment required.</strong> Cancel anytime. All plans include a 7-day free trial.
          </p>
          <p className="text-gray-600">
            Need a custom plan? <a href="#contact" className="text-harvest-gold hover:underline">Contact us</a> for corporate or family packages.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
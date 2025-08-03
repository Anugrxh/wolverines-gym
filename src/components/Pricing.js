import React from 'react';
import './Pricing.css';

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
      buttonText: 'Get Started',
      color: '#666'
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
      buttonText: 'Most Popular',
      color: '#ff6b35'
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
      buttonText: 'Go Elite',
      color: '#1a1a1a'
    }
  ];

  return (
    <section id="pricing" className="section pricing">
      <div className="container">
        <h2 className="section-title">Membership Plans</h2>
        <p className="section-subtitle">
          Choose the perfect plan that fits your fitness goals and lifestyle
        </p>
        
        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.id} 
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && (
                <div className="popular-badge">
                  Most Popular
                </div>
              )}
              
              <div className="plan-header">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-price">
                  <span className="currency">$</span>
                  <span className="amount">{plan.price}</span>
                  <span className="period">/{plan.period}</span>
                </div>
              </div>
              
              <div className="plan-features">
                <ul>
                  {plan.features.map((feature, index) => (
                    <li key={index}>
                      <span className="check-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="plan-footer">
                <a 
                  href="#contact" 
                  className={`btn ${plan.popular ? '' : 'btn-outline'}`}
                  style={plan.popular ? {} : { borderColor: plan.color, color: plan.color }}
                >
                  {plan.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pricing-note">
          <p>
            <strong>No commitment required.</strong> Cancel anytime. All plans include a 7-day free trial.
          </p>
          <p>
            Need a custom plan? <a href="#contact">Contact us</a> for corporate or family packages.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
// Adds full detail-page content for the 7 products, matching remarkablephysio.com.
require('dotenv').config();
const connectDB = require('../config/db');
const Product = require('../models/Product');

const DETAILS = [
  {
    slug: 'braces',
    intro: 'At Remarkable Physiotherapy in Markham, braces are an important part of managing joint strain, improving movement, and supporting recovery. Whether you are dealing with an injury, ongoing discomfort, or need added stability during daily activities, the right brace can make a noticeable difference in how you move and function.',
    whatIsIt: 'Braces are supportive devices designed to stabilize joints, limit harmful movement, and reduce strain on muscles and ligaments. They are commonly used for areas such as the knee, ankle, wrist, elbow, and back, made from durable yet comfortable materials that provide structured support without restricting necessary motion.',
    howItWorks: [
      { title: 'Stabilize Joints', description: 'Holds a joint in proper alignment while allowing safe movement, reducing stress on injured or weakened tissues.' },
      { title: 'Improve Body Awareness', description: 'Helps you maintain proper posture and movement patterns during activity or daily routines.' },
    ],
    keyFeatures: [
      { title: 'Knee Braces', description: 'Used for ligament injuries, arthritis, or post-surgical support to maintain alignment and reduce pressure.' },
      { title: 'Ankle Braces', description: 'Provide stability for weak or injured ankles, often used after sprains or for ongoing instability.' },
      { title: 'Wrist and Hand Braces', description: 'Keep the wrist in a neutral position to reduce stress from repetitive strain or carpal tunnel issues.' },
      { title: 'Back Braces', description: 'Support the lower back and improve posture, especially for strain from lifting or prolonged sitting.' },
      { title: 'Elbow Braces', description: 'Commonly used for tendon-related discomfort, helping reduce strain during arm movements.' },
    ],
    whoCanBenefit: [
      { title: 'Recent Injury', description: 'Anyone who has recently experienced a joint injury or feels instability or weakness in a joint.' },
      { title: 'Active Individuals', description: 'Those returning to physical activity, performing repetitive tasks, or wanting added support during sports.' },
    ],
    conditionsSupported: ['Joint injuries', 'Ligament and tendon strain', 'Arthritis', 'Post-surgical recovery', 'Repetitive strain'],
    benefits: ['Improved stability', 'Reduced strain', 'Enhanced confidence in movement', 'Support during recovery', 'Versatile use'],
    whyChooseUs: [
      { title: 'Professional Assessment', description: 'Our team evaluates your condition and recommends a brace suited to your situation, rather than a generic option.' },
      { title: 'Proper Fitting', description: 'We ensure the brace fits correctly, which is essential for comfort and function.' },
      { title: 'Ongoing Support', description: 'If adjustments are needed or your condition changes, we are available to assist and guide you.' },
    ],
    closingText: 'If you are looking for reliable joint support, braces from Remarkable Physiotherapy can help you move with greater stability and confidence. Our team will help you choose the right option based on your needs and daily routine. Contact us today or visit our clinic to explore available braces and find the right fit for your lifestyle.',
  },
  {
    slug: 'massager',
    intro: 'A massager is a practical device designed to ease muscle tension, improve circulation, and support recovery after daily strain. At Remarkable Physiotherapy in Markham, we provide high-quality massagers that fit easily into your routine, helping you stay active and comfortable throughout the day.',
    whatIsIt: 'A massager is an electronic or manual device that applies targeted pressure, vibration, or percussion to muscles and soft tissues, created to mimic hands-on techniques commonly used in physiotherapy settings.',
    howItWorks: [
      { title: 'Vibration', description: 'Gentle oscillations that stimulate blood flow.' },
      { title: 'Percussion', description: 'Rapid pulses that reach deeper muscle layers.' },
      { title: 'Rolling or Kneading', description: 'Motions that simulate hand pressure to loosen tight areas.' },
    ],
    keyFeatures: [
      { title: 'Adjustable Intensity Levels', description: 'Control speed and pressure for both light relaxation and deeper muscle work.' },
      { title: 'Ergonomic Design', description: 'Comfortable grips and lightweight structures reach the back, shoulders and legs easily.' },
      { title: 'Interchangeable Heads', description: 'Different attachments target specific muscle groups for full-body use.' },
      { title: 'Portable and Convenient', description: 'Compact designs let you use it at home, at work, or while travelling.' },
    ],
    whoCanBenefit: [
      { title: 'Office Workers', description: 'Sitting for extended periods can lead to stiffness in the neck, shoulders and lower back.' },
      { title: 'Active Individuals', description: 'Those who exercise regularly may use a massager post-workout to support recovery.' },
      { title: 'Daily Physical Strain', description: 'Jobs involving lifting, standing, or repetitive movement can cause ongoing tension.' },
    ],
    conditionsSupported: ['Muscle tension', 'Post-activity soreness', 'Reduced flexibility', 'General muscle stiffness'],
    safetyTips: [
      { title: 'Start with Low Intensity', description: 'Begin with a gentle setting and gradually increase based on comfort.' },
      { title: 'Limit Session Duration', description: 'Use for short sessions (10–15 minutes per area) to avoid overuse.' },
      { title: 'Avoid Sensitive Areas', description: 'Do not use directly on joints, bones, or injured regions without professional advice.' },
    ],
    benefits: ['Helps maintain muscle comfort between clinic visits', 'Easy to use at home or on the go', 'Supports circulation and muscle relaxation', 'Reduces stiffness caused by daily habits'],
    whyChooseUs: [
      { title: 'Carefully Selected Products', description: 'Our massagers are selected for quality, durability, and usability.' },
      { title: 'In-Clinic Support', description: 'Our team can help you understand how to use the device correctly for your specific needs.' },
    ],
    closingText: 'If you’re looking for a simple and effective way to manage muscle tension and stay active, a massager can be a valuable addition to your routine. Visit Remarkable Physiotherapy in Markham to explore our selection and find a device that fits your needs.',
  },
  {
    slug: 'tens-unit',
    intro: 'A Transcutaneous Electrical Nerve Stimulation (TENS) unit is a compact, battery-powered device that sends low-voltage electrical impulses through the skin to targeted areas of the body. At Remarkable Physiotherapy in Markham, we provide reliable TENS units along with clear instructions to help you use them safely and effectively.',
    whatIsIt: 'The device sends mild electrical pulses through adhesive electrode pads placed on the skin near the area of discomfort. These signals can reduce the transmission of discomfort signals to the brain and, in some settings, gently activate muscles to reduce tightness and improve circulation.',
    howItWorks: [
      { title: 'Nerve Signal Modulation', description: 'Mild electrical pulses interact with the nervous system, making sensations more manageable.' },
      { title: 'Muscle Stimulation', description: 'Electrical pulses can gently activate muscles, helping reduce tightness.' },
      { title: 'Adjustable Settings', description: 'Control intensity, pulse rate and duration to find a comfortable level.' },
    ],
    keyFeatures: [
      { title: 'Portable and Lightweight', description: 'Easy to carry and use at home, work, or while travelling.' },
      { title: 'Multiple Intensity Levels', description: 'Adjust the strength of the electrical pulses to match your comfort level.' },
      { title: 'Pre-Set Programs', description: 'Built-in modes designed for different body areas such as the back, shoulders and legs.' },
      { title: 'Reusable Electrode Pads', description: 'High-quality adhesive pads ensure consistent contact and can be reused with proper care.' },
    ],
    whoCanBenefit: [
      { title: 'Ongoing Discomfort', description: 'People dealing with recurring muscle or joint issues.' },
      { title: 'Office Workers', description: 'Long hours at a desk can lead to tension in the neck, shoulders and lower back.' },
      { title: 'Active Individuals and Athletes', description: 'Support for muscle recovery and relaxation after intense activity.' },
    ],
    conditionsSupported: ['Back and neck discomfort', 'Joint stiffness', 'Muscle soreness', 'Sports-related strain', 'Postural tension'],
    safetyTips: [
      { title: 'Placement of Pads', description: 'Electrode pads should be placed around the area of concern, not directly on joints or broken skin. Our clinic team will guide you on proper placement.' },
      { title: 'Session Duration', description: 'Typical sessions last 15–30 minutes, depending on comfort and needs.' },
    ],
    benefits: ['Non-invasive management of discomfort', 'Portable and easy to use daily', 'Adjustable to personal comfort level', 'Complements physiotherapy and movement strategies'],
    whyChooseUs: [
      { title: 'Professional Support', description: 'You receive clear instructions on setup, pad placement, and usage from day one.' },
      { title: 'Ongoing Assistance', description: 'If you have questions about settings, usage, or maintenance, our team is available to help.' },
    ],
    closingText: 'If you are looking for a practical, non-invasive way to manage muscle and joint discomfort, a TENS unit can be a valuable addition to your routine. Contact us or visit the clinic today to purchase your TENS unit and start managing discomfort.',
  },
  {
    slug: 'pain-relief-creams',
    intro: 'Pain relief creams are widely used for managing muscle soreness, joint discomfort, and stiffness in daily life. At Remarkable Physiotherapy in Markham, we provide carefully selected creams that support recovery, improve mobility, and help individuals stay active without relying only on oral options.',
    whatIsIt: 'Pain relief creams are topical products applied directly to the skin over affected areas, formulated with active ingredients such as menthol, capsaicin, camphor and anti-inflammatory compounds that work locally on specific areas without affecting the entire body.',
    howItWorks: [
      { title: 'Targeted Action', description: 'Ingredients penetrate the skin and work on the tissues beneath, creating a warming or cooling sensation that supports muscle relaxation.' },
      { title: 'Fast Absorption', description: 'Absorbs quickly into the skin without a heavy or greasy residue, letting you resume your routine right away.' },
    ],
    keyFeatures: [
      { title: 'Non-Greasy Formulation', description: 'Smooth texture and quick absorption without staining clothing.' },
      { title: 'Suitable for Daily Use', description: 'Can be used after activity, during work breaks, or before rest.' },
      { title: 'Versatile Use', description: 'Applied to neck, shoulders, lower back, knees, joints, arms and legs.' },
    ],
    whoCanBenefit: [
      { title: 'Muscle Soreness', description: 'People experiencing soreness after exercise, long work hours, or physical strain.' },
      { title: 'Office Workers', description: 'Stiffness in the neck, shoulders and lower back from sitting can be eased during breaks.' },
      { title: 'Older Adults', description: 'A simple way to manage joint stiffness and reduced mobility.' },
    ],
    conditionsSupported: ['Muscle soreness', 'Joint stiffness', 'Post-activity discomfort', 'Daily tension'],
    safetyTips: [
      { title: 'Follow Instructions', description: 'Always read the label and apply only the recommended amount.' },
      { title: 'Avoid Sensitive Areas', description: 'Do not apply to broken skin, eyes, or sensitive regions.' },
      { title: 'Test Before Regular Use', description: 'Apply a small amount first to check for any skin reaction.' },
    ],
    benefits: ['Direct application to the area needed', 'Quick soothing, cooling or warming effect', 'Convenient, no water or extra steps', 'Complements physiotherapy sessions'],
    whyChooseUs: [
      { title: 'Carefully Selected Products', description: 'Each product is chosen with patient needs in mind.' },
      { title: 'Professional Insight', description: 'Our team understands how different conditions affect the body and can help you choose a cream that aligns with your needs and daily activities.' },
    ],
    closingText: 'Pain relief creams can play a simple yet effective role in daily care. Visit Remarkable Physiotherapy in Markham, speak with our team, explore available options, and find a product that supports your daily routine. Contact us today or visit the clinic to purchase your pain relief cream and take the next step toward staying active and comfortable.',
  },
  {
    slug: 'hot-and-cold-pack',
    intro: 'Managing muscle soreness, swelling, or stiffness can be challenging, especially with a busy routine. A hot and cold pack is a simple, practical solution used in clinics and at home to help manage discomfort, reduce swelling, and support recovery after physical strain or injury.',
    whatIsIt: 'A hot and cold pack is a reusable therapy pack that delivers both heat and cold applications as needed, typically filled with a gel or material that retains temperature for extended periods. It can be frozen for cold use or warmed in hot water or a microwave for heat application.',
    howItWorks: [
      { title: 'Cold Therapy (Cryotherapy)', description: 'Helps constrict blood vessels, reducing swelling, inflammation and discomfort after injury or activity.' },
      { title: 'Heat Therapy (Thermotherapy)', description: 'Increases blood flow to the targeted area, relaxing tight muscles and reducing stiffness.' },
    ],
    keyFeatures: [
      { title: 'Dual Temperature Use', description: 'One pack serves both hot and cold purposes for different conditions.' },
      { title: 'Flexible Design', description: 'Contours to different parts of the body, such as the knee, shoulder or lower back, even when chilled.' },
      { title: 'Reusable and Durable', description: 'Built for repeated use without losing effectiveness.' },
    ],
    whoCanBenefit: [
      { title: 'Office Workers', description: 'Experiencing neck or back tension from long hours seated.' },
      { title: 'Athletes', description: 'Managing post-exercise soreness and swelling.' },
      { title: 'Seniors', description: 'Looking to maintain mobility and manage stiffness.' },
    ],
    conditionsSupported: ['Recent sprains or strains', 'Joint swelling', 'Post-workout soreness', 'Muscle tightness', 'Chronic aches'],
    safetyTips: [
      { title: 'For Cold Use', description: 'Freeze for 1–2 hours, wrap in a cloth, and apply for 10–15 minutes at a time.' },
      { title: 'For Heat Use', description: 'Warm in the microwave or hot water, ensure it is not too hot, and use for 15–20 minutes.' },
      { title: 'General Safety', description: 'Do not apply directly to bare skin without a barrier and avoid prolonged single sessions.' },
    ],
    benefits: ['One pack for both hot and cold needs', 'Flexible, contouring design', 'Reusable and cost-efficient', 'Portable for home, work or after activity'],
    whyChooseUs: [
      { title: 'Professional Insight', description: 'Our team can guide you on when to use heat or cold based on your condition or routine.' },
      { title: 'Support Beyond Purchase', description: 'We help you understand how to use the product effectively as part of your daily routine or recovery plan.' },
    ],
    closingText: 'A hot and cold pack is a practical tool for managing muscle and joint discomfort without complicated steps. Visit Remarkable Physiotherapy to get your hot and cold pack today — our team is ready to help you choose the right option and show you how to use it effectively.',
  },
  {
    slug: 'custom-made-orthotics',
    intro: 'Custom-made orthotics are designed to support the structure of your feet and improve your movement throughout the day. At Remarkable Physiotherapy in Markham, these devices are created to match your unique foot shape, helping address discomfort, alignment issues, and strain that can affect your daily routine.',
    whatIsIt: 'Custom-made orthotics are inserts placed inside your shoes to support and align your feet, crafted based on a detailed assessment of your foot mechanics, posture, and walking pattern — unlike over-the-counter insoles.',
    howItWorks: [
      { title: 'Foot Assessment and Analysis', description: 'Examines walking pattern, foot posture and pressure points using scanning or casting methods.' },
      { title: 'Precision Design and Fabrication', description: 'Crafted to match arch type, pressure distribution and daily activities.' },
      { title: 'Ongoing Support During Use', description: 'Guides your feet into a more stable position, reducing strain on muscles and joints.' },
    ],
    keyFeatures: [
      { title: 'Individualized Fit', description: 'Created specifically for your feet for accurate support and alignment.' },
      { title: 'Durable Materials', description: 'Maintain structure over time, even with daily use.' },
      { title: 'Versatility Across Footwear', description: 'Designed to fit athletic, work and casual shoes.' },
    ],
    whoCanBenefit: [
      { title: 'Foot Discomfort', description: 'Conditions such as plantar fasciitis, flat feet or high arches.' },
      { title: 'Active Individuals and Athletes', description: 'Improved alignment and reduced risk of overuse injuries.' },
      { title: 'Standing for Long Hours', description: 'Weight distributed more evenly for extended standing.' },
    ],
    conditionsSupported: ['Plantar fasciitis', 'Flat feet or fallen arches', 'High arches', 'Heel pain', 'Shin splints', 'Knee strain related to alignment', 'Lower back discomfort linked to posture'],
    benefits: ['Improved stability during movement', 'Reduced strain on ankles, knees, hips and back', 'Fits easily into daily routine', 'Supports a broader movement-focused care plan'],
    whyChooseUs: [
      { title: 'Thorough Assessment Process', description: 'Orthotics are based on accurate findings rather than general assumptions.' },
      { title: 'Ongoing Support and Adjustments', description: 'Follow-up visits allow adjustments as your activity levels or condition change.' },
    ],
    closingText: 'If foot discomfort or alignment issues are affecting your daily routine, custom-made orthotics may help improve your movement and overall comfort. Contact our clinic today to get your custom-made orthotics and learn how they can support your everyday activities.',
  },
  {
    slug: 'posture-corrector-brace',
    intro: 'Maintaining proper posture is essential for daily comfort, mobility, and overall physical function. A posture corrector brace is designed to support your upper body, promote proper alignment, and reduce strain from prolonged sitting, standing, or repetitive movements.',
    whatIsIt: 'A posture corrector brace is a wearable support device that gently aligns the shoulders and upper spine into a more natural position, made from lightweight, breathable materials and worn around the shoulders and upper back.',
    howItWorks: [
      { title: 'Gentle Alignment Support', description: 'Repositions the shoulders and upper back into neutral alignment, reducing slouching and forward head posture.' },
      { title: 'Muscle Engagement', description: 'Encourages your muscles to stay active, helping strengthen postural muscles over time.' },
      { title: 'Daily Habit Reinforcement', description: 'Trains your body to recognize proper posture, so alignment carries over even without the brace.' },
    ],
    keyFeatures: [
      { title: 'Adjustable Fit', description: 'Adjustable straps ensure a secure, comfortable fit for various body types.' },
      { title: 'Lightweight and Breathable', description: 'Designed for daily wear with airflow to minimize discomfort.' },
      { title: 'Discreet Design', description: 'Can be worn under clothing for use at work, home, or on the go.' },
    ],
    whoCanBenefit: [
      { title: 'Office Workers and Students', description: 'Long hours at a desk can lead to rounded shoulders and upper back strain.' },
      { title: 'Neck and Upper Back Strain', description: 'Poor posture often contributes to discomfort in these areas.' },
      { title: 'Active Individuals', description: 'Proper posture improves movement efficiency and helps prevent injury.' },
    ],
    conditionsSupported: ['Rounded shoulders', 'Forward head posture', 'Upper back strain', 'Postural imbalances'],
    safetyTips: [
      { title: 'Start Gradually', description: 'Wear for 20–30 minutes per day, increasing gradually as your body adapts.' },
      { title: 'Combine with Movement', description: 'Incorporate stretching and strengthening exercises to support posture improvement.' },
    ],
    benefits: ['Improved spinal alignment', 'Reduced muscle fatigue', 'Enhanced confidence', 'Support for daily activities'],
    whyChooseUs: [
      { title: 'Professional Assessment', description: 'Our team evaluates your posture and movement patterns to help you select the right brace.' },
      { title: 'Ongoing Support', description: 'If you have questions about usage or fit, our clinic is available to assist you.' },
    ],
    closingText: 'A posture corrector brace can be a practical addition to your daily routine, helping you stay aligned, reduce strain, and build healthier posture habits over time. Visit Remarkable Physiotherapy to explore our posture corrector brace and find the right fit for your needs. Contact our clinic today or stop by to speak with our team and take the first step toward improving your posture.',
  },
];

async function run() {
  await connectDB();
  let updated = 0;
  for (const d of DETAILS) {
    const { slug, ...fields } = d;
    const res = await Product.updateOne({ slug }, { $set: fields });
    if (res.matchedCount) updated++;
    else console.log('No product found for slug:', slug);
  }
  console.log(`Updated detail content for ${updated}/${DETAILS.length} products`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

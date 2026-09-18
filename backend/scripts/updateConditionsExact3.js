// Verbatim condition detail content, batch 3 (final) — completes all 23 conditions.
require('dotenv').config();
const connectDB = require('../config/db');
const Condition = require('../models/Condition');

const DETAILS = [
  {
    slug: 'foot-pain',
    intro: 'Foot pain can interfere with daily routines, limit mobility, and affect overall comfort. Whether it starts suddenly or develops over time, ignoring it may lead to further complications. At Remarkable Physiotherapy in Markham, we focus on identifying the root cause of foot pain and helping individuals move with ease again through structured care and targeted techniques.',
    whatIsIt: 'Foot pain refers to discomfort in any part of the foot, including the heel, arch, sole, toes, or ankle region. Since the feet carry the body’s weight throughout the day, even minor issues can lead to noticeable discomfort. Even mild foot pain can affect how you move, stand, and perform everyday tasks. It may cause you to change your walking pattern, leading to discomfort in other areas, such as the knees, hips, or lower back. Addressing foot pain early can help prevent these secondary issues and maintain overall mobility.',
    symptoms: ['Sharp or dull aches in the heel or arch', 'Swelling or stiffness', 'Difficulty walking or standing for long periods', 'Burning or tingling sensations', 'Pain that worsens with activity'],
    symptomsDetails: [],
    causes: [],
    causesDetails: [
      { title: 'Plantar Fasciitis', description: 'This is one of the most common causes of heel pain. It occurs when the tissue along the bottom of the foot becomes irritated, often due to overuse or poor footwear.' },
      { title: 'Flat Feet or High Arches', description: 'Structural differences in the foot can lead to uneven weight distribution, placing extra stress on certain areas.' },
      { title: 'Tendon Issues', description: 'Inflammation or strain in the tendons around the foot and ankle can result in persistent discomfort.' },
      { title: 'Arthritis', description: 'Joint-related conditions can affect the foot, leading to stiffness and reduced mobility.' },
      { title: 'Sports and Overuse Injuries', description: 'Activities that involve running, jumping, or prolonged standing can strain the foot over time.' },
    ],
    treatmentApproach: 'At Remarkable Physiotherapy, we begin with a detailed assessment to understand your condition fully.',
    treatmentDetails: [
      { title: 'What to Expect During Your Visit', description: 'Discussion about your symptoms and daily activities. Physical examination of the foot and ankle. Evaluation of walking patterns and posture. Identification of contributing factors, such as footwear or activity levels. This process allows us to create a structured plan suited to your needs.' },
      { title: 'Manual Therapy', description: 'Hands-on techniques are used to improve joint movement, reduce stiffness, and support natural function.' },
      { title: 'Exercise Programs', description: 'Specific exercises help strengthen muscles, improve flexibility, and support the foot’s structure.' },
      { title: 'Gait Training', description: 'We assess how you walk and provide corrections to reduce strain on the foot.' },
      { title: 'Supportive Techniques', description: 'Taping methods and recommendations for footwear can help reduce stress on affected areas.' },
      { title: 'Education and Prevention', description: 'We guide you on daily habits, activity adjustments, and self-care methods to reduce the risk of recurring issues.' },
    ],
    benefits: [],
    practicalTips: ['Wear properly fitted and supportive shoes.', 'Avoid standing for long periods without breaks.', 'Stretch your feet and calves regularly.', 'Gradually increase activity levels.', 'Maintain a healthy body weight.'],
    practicalTipsDetails: [],
    whyChooseUs: [
      { title: 'What Sets Us Apart', description: 'Individual attention during every session. Focus on identifying the root cause, not just symptoms. Modern techniques combined with practical strategies. Supportive environment focused on your progress. Convenient Markham location. We aim to help you move comfortably and return to your daily routine with confidence.' },
    ],
    whenToSeekHelp: 'If foot pain persists for more than a few days, worsens over time, or interferes with daily activities, it is important to seek professional care. Early attention can help prevent the issue from becoming more complex. Foot pain doesn’t have to limit your lifestyle. At Remarkable Physiotherapy in Markham, we are ready to help you move forward with confidence through focused care and practical solutions. Book an appointment today to learn how we can support your recovery and help you get back to your daily activities without discomfort.',
  },
  {
    slug: 'knee-pain',
    intro: 'Knee pain can interfere with daily movement, limit activity levels, and make even simple tasks like walking or climbing stairs difficult. At Remarkable Physiotherapy in Markham, we focus on identifying the root cause of knee pain and helping individuals move with confidence again through structured care and targeted techniques.',
    whatIsIt: 'Knee pain refers to discomfort or stiffness in or around the knee joint. It can develop suddenly due to injury or gradually over time from repeated strain or age-related changes. The knee is one of the most used joints in the body, making it more vulnerable to stress and damage.',
    symptoms: ['Swelling or stiffness that persists', 'Difficulty bending or straightening the knee', 'Pain during walking, running, or standing', 'Clicking, locking, or instability in the joint', 'Weakness around the knee'],
    symptomsDetails: [],
    causes: ['Ligament injuries such as ACL or MCL strains', 'Meniscus tears caused by twisting motions', 'Tendon irritation from overuse', 'Cartilage wear is often linked to osteoarthritis.', 'Muscle imbalances affecting joint stability', 'Poor movement patterns during physical activity'],
    causesDetails: [],
    treatmentApproach: 'At Remarkable Physiotherapy, the process begins with a detailed evaluation. This includes reviewing your movement patterns, strength, flexibility, and joint function. By identifying the exact source of the issue, a focused plan can be created to address the problem directly.',
    treatmentDetails: [
      { title: 'Key Areas of Evaluation', description: 'Joint mobility and alignment. Muscle strength around the hip, thigh, and calf. Walking and movement mechanics. Activity levels and lifestyle factors. This approach ensures that care is based on your specific needs rather than a general plan.' },
      { title: 'Exercise-Based Rehabilitation', description: 'Targeted exercises play a central role in recovery. These may include strength training for the quadriceps and hamstrings, hip and core stability work, balance and coordination drills, and stretching to improve flexibility. These exercises are adjusted over time as your condition improves.' },
      { title: 'Manual Therapy Techniques', description: 'Hands-on techniques can help improve joint mobility and reduce stiffness. These methods are applied carefully to support natural movement and function.' },
      { title: 'Movement Retraining', description: 'Incorrect movement patterns often contribute to ongoing knee pain. By correcting posture, walking mechanics, and activity techniques, stress on the knee can be reduced significantly.' },
      { title: 'Conditions Commonly Treated', description: 'Runner’s knee (patellofemoral pain syndrome). Ligament sprains. Meniscus injuries. Tendon irritation, such as patellar tendinitis. Post-surgical knee recovery. Arthritis-related knee discomfort. Each condition is approached with a structured plan that evolves as progress is made.' },
    ],
    benefits: [],
    practicalTips: ['Maintain strength in the legs and hips.', 'Warm up before physical activity.', 'Use proper techniques during exercise or sports.', 'Avoid sudden increases in activity intensity.', 'Wear supportive footwear.'],
    practicalTipsDetails: [],
    whyChooseUs: [
      { title: 'What Sets Us Apart', description: 'One-on-one sessions with focused attention. Clear communication at every stage of care. Structured progress tracking. A welcoming and supportive environment. Flexible appointment scheduling for Markham residents. We prioritize helping you return to your regular activities with confidence and improved movement.' },
    ],
    whenToSeekHelp: 'If knee pain is limiting your ability to stay active or affecting your daily routine, it’s time to take action. Early intervention can help prevent further complications and support faster progress. If you’re dealing with knee pain in Markham, Remarkable Physiotherapy is here to help. Our team is ready to support you with focused care designed to restore movement and improve function. Contact us today to schedule your appointment and take the first step toward moving comfortably again.',
  },
  {
    slug: 'ankle-pain',
    intro: 'Ankle pain can affect your ability to move comfortably, whether you’re walking, running, or simply standing for extended periods. At Remarkable Physiotherapy in Markham, we focus on identifying the root cause of ankle pain and helping you return to your daily routine with confidence.',
    whatIsIt: 'Ankle pain refers to discomfort, stiffness, or swelling in or around the ankle joint. This joint plays a key role in supporting body weight and enabling movement, which makes it vulnerable to strain and injury. Pain can develop suddenly due to an injury or gradually over time because of repetitive stress or underlying conditions. Regardless of how it starts, proper care is important to avoid further complications.',
    symptoms: [],
    symptomsDetails: [
      { title: 'Persistent Discomfort', description: 'If your ankle pain does not improve after a few days, it may indicate a deeper issue that requires attention.' },
      { title: 'Swelling and Stiffness', description: 'Swelling, reduced movement, or stiffness can make daily activities difficult and may worsen without proper care.' },
      { title: 'Instability', description: 'A feeling that your ankle may “give way” while walking or standing is often linked to weakened ligaments or past injuries.' },
      { title: 'Difficulty Bearing Weight', description: 'If putting weight on your ankle causes significant discomfort, it’s important to seek professional assessment.' },
    ],
    causes: [],
    causesDetails: [
      { title: 'Acute Injuries', description: 'Sudden injuries are among the most common causes of ankle pain. These may include sprains from twisting the ankle, strains involving muscles or tendons, ligament tears, and fractures from falls or accidents.' },
      { title: 'Overuse and Repetitive Stress', description: 'Activities that involve repeated movement can place continuous stress on the ankle. This is often seen in running or jumping sports, long hours of standing, and improper footwear use. Over time, this can lead to inflammation and discomfort.' },
      { title: 'Medical Conditions', description: 'Certain conditions can also contribute to ankle pain, such as arthritis affecting joint mobility, tendon irritation, nerve-related issues, and flat feet or structural imbalances.' },
    ],
    treatmentApproach: 'At Remarkable Physiotherapy, care focuses on restoring movement, improving strength, and addressing the underlying issue rather than just the symptoms.',
    treatmentDetails: [
      { title: 'Thorough Assessment', description: 'Each case begins with a detailed evaluation to understand the source of pain, movement limitations, and muscle strength and joint stability. This allows for a focused plan that aligns with your condition and daily needs.' },
      { title: 'Targeted Exercise Programs', description: 'Specific exercises are introduced to improve flexibility, strengthen supporting muscles, and enhance joint stability. These exercises also play a key role in preventing future injuries.' },
      { title: 'Manual Therapy Techniques', description: 'Hands-on techniques may be used to improve joint mobility and reduce stiffness. This can help restore normal movement patterns.' },
      { title: 'Movement and Posture Correction', description: 'Improper walking patterns or posture can place extra stress on the ankle. Correcting these habits helps reduce strain and supports recovery.' },
      { title: 'Gradual Return to Activity', description: 'Whether you are an athlete or someone with an active lifestyle, a structured return-to-activity plan ensures your ankle is ready for daily demands.' },
    ],
    benefits: [],
    practicalTips: [],
    practicalTipsDetails: [
      { title: 'Rest and Activity Modification', description: 'Avoid activities that worsen your pain while staying gently active within your comfort level.' },
      { title: 'Ice Application', description: 'Applying ice for short periods can help reduce swelling, especially after activity.' },
      { title: 'Supportive Footwear', description: 'Wearing shoes that provide proper support can make a noticeable difference in reducing strain on your ankle.' },
      { title: 'Gentle Exercises', description: 'Simple mobility and strengthening exercises can support recovery when done correctly.' },
    ],
    whyChooseUs: [
      { title: 'Patient-Focused Care', description: 'At Remarkable Physiotherapy, every individual is treated with attention and care. The focus remains on understanding your concerns and helping you move forward safely.' },
      { title: 'Experienced Team', description: 'The clinic is staffed by trained professionals who work with a wide range of ankle conditions, from mild discomfort to more complex cases.' },
      { title: 'Modern Techniques', description: 'A combination of hands-on care and exercise-based approaches is used to support recovery and improve movement.' },
      { title: 'Convenient Markham Location', description: 'Located in Markham, the clinic is easily accessible, making it simple to stay consistent with your sessions.' },
      { title: 'Education and Prevention', description: 'You’ll also learn how to manage your condition and avoid future issues through simple lifestyle and movement adjustments.' },
    ],
    whenToSeekHelp: 'If your ankle pain persists for more than a few days, worsens over time, limits your daily activities, or follows an injury, it’s time to consult a physiotherapy professional for a proper assessment. Ankle pain can interfere with even the simplest tasks, but it doesn’t have to control your routine. At Remarkable Physiotherapy in Markham, you’ll receive focused care aimed at restoring movement and helping you get back to what matters most. Book an appointment today to learn how we can help you manage ankle pain and improve your mobility.',
  },
  {
    slug: 'concussions',
    intro: 'Concussions are a form of mild traumatic brain injury that occurs when a sudden impact or jolt affects how the brain functions. They can occur during sports, falls, car accidents, or even minor incidents in which the head or body is abruptly shaken. Although often considered mild, concussions should never be ignored, as symptoms can affect daily life and long-term health. At Remarkable Physiotherapy in Markham, we focus on helping individuals recover safely and return to their normal routines with confidence. Early attention and the right approach can make a significant difference in how quickly and smoothly recovery progresses.',
    whatIsIt: '',
    symptoms: [],
    symptomsDetails: [
      { title: 'Physical Symptoms', description: 'Headaches or pressure in the head. Dizziness or balance issues. Nausea or vomiting. Sensitivity to light or noise. Blurred or double vision.' },
      { title: 'Cognitive Symptoms', description: 'Difficulty concentrating. Memory problems. Feeling mentally “foggy.” Slower thinking or processing.' },
      { title: 'Emotional and Sleep Changes', description: 'Irritability or mood swings. Anxiety or sadness. Trouble falling asleep or sleeping too much.' },
    ],
    causes: ['Sports injuries (football, hockey, soccer, etc.)', 'Falls at home or work', 'Motor vehicle accidents', 'Physical altercations'],
    causesDetails: [
      { title: 'Risk Factors', description: 'Certain individuals may face a higher risk, such as athletes, children, older adults, and those with a history of previous concussions. Repeated injuries without proper recovery time can lead to more serious complications.' },
    ],
    treatmentApproach: 'Recovery from concussions involves more than just rest. A structured plan can help restore function and reduce lingering symptoms. At Remarkable Physiotherapy, care is focused on addressing the specific challenges each person faces.',
    treatmentDetails: [
      { title: 'Vestibular Rehabilitation', description: 'This approach targets dizziness and balance problems. Through controlled movements and exercises, the body learns to regain stability and coordination.' },
      { title: 'Cervical Spine Care', description: 'Neck stiffness and pain often accompany concussions. Addressing the cervical spine can reduce headaches and improve mobility.' },
      { title: 'Gradual Return to Activity', description: 'A step-by-step plan helps individuals return to work, school, or sports without worsening symptoms. Progression is based on how the body responds at each stage.' },
      { title: 'Visual and Oculomotor Training', description: 'Some people experience vision-related difficulties. Exercises can help improve eye coordination and reduce strain.' },
      { title: 'Education and Lifestyle Strategies', description: 'Learning to manage symptoms, adjust daily activities, and avoid triggers is key to recovery.' },
      { title: 'Initial Assessment', description: 'Your first visit includes a detailed discussion about your injury, symptoms, and medical history. This is followed by physical and neurological evaluations to identify areas that need attention.' },
      { title: 'Ongoing Sessions', description: 'Each session builds on your progress. Techniques and exercises are adjusted as your condition changes, ensuring steady improvement.' },
      { title: 'Progress Tracking', description: 'Monitoring your recovery helps guide decisions about activity levels and timelines for returning to normal routines.' },
    ],
    benefits: [],
    practicalTips: [],
    practicalTipsDetails: [
      { title: 'Rest and Activity Balance', description: 'Complete rest is important initially, but prolonged inactivity can slow recovery. Gradual reintroduction of activities is key.' },
      { title: 'Limit Screen Time', description: 'Reducing screen exposure can help reduce headaches and eye strain.' },
      { title: 'Stay Hydrated and Eat Well', description: 'Proper nutrition and hydration support the body’s recovery process.' },
      { title: 'Follow Professional Advice', description: 'Stick to the plan your physiotherapist provided to avoid setbacks.' },
    ],
    whyChooseUs: [
      { title: 'Individual-Focused Care', description: 'Every concussion is different. Your care plan is created based on your symptoms, lifestyle, and recovery goals.' },
      { title: 'Evidence-Based Methods', description: 'Approaches used in the clinic are grounded in current research and clinical practice, ensuring safe and effective care.' },
      { title: 'Support Throughout Recovery', description: 'From your first visit to your return to daily activities, you’ll have consistent support and clear direction at every step.' },
      { title: 'Collaborative Environment', description: 'When needed, coordination with other healthcare providers ensures a well-rounded approach to your recovery.' },
    ],
    whenToSeekHelp: 'It’s important to seek care if you experience symptoms that last more than a few days, worsening headaches or dizziness, difficulty with daily tasks, or multiple concussions over time. Ignoring symptoms can delay recovery and increase the risk of further complications. Early intervention can help reduce symptom duration and intensity. If you or someone you know is dealing with concussions in Markham, Remarkable Physiotherapy is here to help. With focused care and a structured approach, recovery becomes more manageable and less overwhelming. Book an appointment today at our clinic to learn how we can support your recovery journey.',
  },
  {
    slug: 'wsib-injuries',
    intro: 'Workplace injuries can disrupt daily routines, limit movement, and make even simple tasks challenging. If you’ve been hurt on the job, getting the right support early can make a meaningful difference in how you move forward. At Remarkable Physiotherapy in Markham, we assist individuals dealing with WSIB injuries by focusing on recovery, function, and safe return to work.',
    whatIsIt: 'WSIB injuries refer to physical conditions that occur as a result of workplace incidents and are covered under the Workplace Safety and Insurance Board (WSIB). These injuries can develop suddenly, such as from an accident, or gradually over time due to repetitive strain or poor workplace ergonomics.',
    symptoms: ['Persistent pain or discomfort', 'Reduced range of motion', 'Swelling or stiffness', 'Weakness in muscles or joints', 'Difficulty performing routine activities', 'Numbness or tingling sensations'],
    symptomsDetails: [],
    causes: ['Muscle strains and ligament sprains', 'Back and neck pain', 'Repetitive strain injuries (RSI)', 'Shoulder injuries', 'Joint stiffness and inflammation', 'Tendon-related conditions', 'Post-accident mobility limitations'],
    causesDetails: [
      { title: 'Physical Demands at Work', description: 'Jobs that involve lifting, pushing, pulling, or prolonged standing can strain muscles and joints.' },
      { title: 'Repetitive Movements', description: 'Tasks performed repeatedly over long periods, such as typing, assembly line work, or tool handling, can lead to overuse injuries.' },
      { title: 'Poor Ergonomics', description: 'Improper workstation setup or incorrect posture can gradually strain the body.' },
      { title: 'Slips, Trips, and Falls', description: 'Unexpected workplace accidents can result in sudden injuries affecting multiple areas.' },
    ],
    treatmentApproach: 'At Remarkable Physiotherapy, the focus is on helping individuals regain movement, rebuild strength, and return to daily activities safely. Each step of care is structured to address your specific condition and work demands.',
    treatmentDetails: [
      { title: 'Detailed Assessment', description: 'Your first visit includes a thorough evaluation to understand the nature of your injury, movement limitations, and job requirements.' },
      { title: 'Targeted Treatment Plans', description: 'Based on the assessment, a structured plan is created to improve mobility, strength, and function. This may include guided exercises, manual techniques, and movement training.' },
      { title: 'Functional Rehabilitation', description: 'Recovery is not just about reducing discomfort; it’s about restoring your ability to perform work-related tasks. Functional training helps prepare your body for real-world activities.' },
      { title: 'Education and Prevention', description: 'Learning proper movement patterns, posture, and workplace adjustments can reduce the chances of re-injury.' },
      { title: 'Step-by-Step Care', description: 'Each session builds on your progress. As your condition improves, exercises and techniques are adjusted to match your recovery stage.' },
      { title: 'Active Participation', description: 'You play a key role in your progress. Following recommended exercises and staying consistent with sessions can support steady improvement.' },
      { title: 'Progress Monitoring', description: 'Regular check-ins help track how your body is responding and ensure that your recovery stays on the right path.' },
      { title: 'Modified Duties', description: 'You may begin with lighter tasks before resuming full responsibilities.' },
      { title: 'Strength and Conditioning', description: 'Improving physical capacity helps prepare your body for workplace demands.' },
      { title: 'Ongoing Support', description: 'Continued care and monitoring can help ensure a smooth transition back to work.' },
    ],
    benefits: [],
    practicalTips: [],
    practicalTipsDetails: [],
    whyChooseUs: [
      { title: 'What Sets Us Apart', description: 'Care is focused on your specific injury and job requirements. Clear communication helps you understand each step of your recovery. A structured approach supports steady and measurable progress. The clinic environment is welcoming and focused on patient comfort. Support is provided throughout your WSIB claim process, where needed. The goal is to help you move safely, restore function, and return to your routine with confidence.' },
    ],
    whenToSeekHelp: 'If you are dealing with WSIB injuries in Markham, taking the first step toward recovery can make a real difference. Reach out to Remarkable Physiotherapy to schedule your assessment or speak with our team about your condition. Book your appointment today and start working toward improved movement and function.',
  },
  {
    slug: 'dance-injuries',
    intro: 'Dance is a powerful form of expression that combines strength, flexibility, and precision. However, the repetitive movements and physical demands involved can sometimes lead to strain or injury. At Remarkable Physiotherapy in Markham, we focus on helping dancers recover safely while supporting their return to movement with confidence.',
    whatIsIt: 'Dance injuries refer to physical issues that occur due to repetitive stress, overuse, improper technique, or sudden impact. These injuries can affect muscles, joints, ligaments, and tendons, often developing gradually over time or appearing suddenly during a performance or training session. Dancers often push their bodies to achieve technical perfection, which can increase the risk of injury if adequate care and conditioning are not maintained.',
    symptoms: ['Persistent soreness that does not improve', 'Swelling or stiffness around joints', 'Sharp pain during movement', 'Reduced range of motion', 'Difficulty performing routine steps'],
    symptomsDetails: [],
    causes: ['Poor technique or alignment', 'Inadequate warm-up routines', 'Sudden increase in training intensity', 'Muscle imbalances or weakness', 'Fatigue and lack of rest', 'Improper footwear or flooring'],
    causesDetails: [
      { title: 'Overuse Injuries', description: 'These occur when the same movement is repeated frequently without enough rest. Common examples include tendon irritation, shin pain, and stress fractures.' },
      { title: 'Sprains and Strains', description: 'Ligaments and muscles can be overstretched or torn during jumps, turns, or awkward landings. Ankles and knees are particularly vulnerable.' },
      { title: 'Hip and Lower Back Issues', description: 'Movements that require extreme flexibility or turnout can strain the hips and lower spine, leading to discomfort and limited mobility.' },
      { title: 'Foot and Ankle Problems', description: 'Dancers rely heavily on their feet. Conditions such as plantar fasciitis, Achilles tendon irritation, and ankle instability are frequently seen.' },
    ],
    treatmentApproach: 'At Remarkable Physiotherapy in Markham, we take a structured approach to managing dance injuries. The goal is not only to address the immediate issue but also to reduce the chances of it happening again.',
    treatmentDetails: [
      { title: 'Assessment and Diagnosis', description: 'A detailed evaluation helps identify the root cause of the injury. This includes posture analysis, movement patterns, and strength testing.' },
      { title: 'Targeted Exercise Programs', description: 'Specific exercises are introduced to improve strength, flexibility, and stability. These programs are designed to match the dancer’s style and level of activity.' },
      { title: 'Manual Therapy', description: 'Hands-on techniques are used to improve joint mobility and reduce muscle tension, helping restore normal movement.' },
      { title: 'Movement Re-Training', description: 'Correcting technique and alignment is essential. This step focuses on improving the body’s movement during dance to reduce unnecessary strain.' },
      { title: 'Gradual Return to Dance', description: 'A step-by-step progression ensures that dancers return safely without risking further injury.' },
    ],
    benefits: [],
    practicalTips: [],
    practicalTipsDetails: [
      { title: 'Proper Warm-Up and Cool-Down', description: 'Preparing the body before dancing and allowing it to recover afterward helps reduce stress on muscles and joints.' },
      { title: 'Strength and Conditioning', description: 'Building strength in key areas such as the core, hips, and legs provides better support during movement.' },
      { title: 'Rest and Recovery', description: 'Allowing time for the body to recover is just as important as training. Overtraining increases the risk of injury.' },
      { title: 'Technique Improvement', description: 'Working on proper alignment and control reduces unnecessary strain on the body.' },
      { title: 'Listening to Your Body', description: 'Ignoring discomfort can lead to more serious issues. Early attention to minor problems can prevent major setbacks.' },
    ],
    whyChooseUs: [
      { title: 'Focus on Dancers’ Needs', description: 'We understand the physical demands of dance and adapt our approach to suit different styles, including ballet, contemporary, hip-hop, and others.' },
      { title: 'One-on-One Care', description: 'Each session is dedicated to your progress, ensuring focused attention and consistent monitoring.' },
      { title: 'Goal-Oriented Plans', description: 'Your recovery plan is built around your specific goals, whether it’s returning to training, preparing for a performance, or maintaining long-term physical health.' },
      { title: 'Modern Techniques', description: 'We use current physiotherapy practices that support safe and efficient recovery while improving movement quality.' },
      { title: 'Supportive Environment', description: 'Our clinic provides a space where dancers feel heard and supported throughout their recovery process.' },
    ],
    whenToSeekHelp: 'If you are dealing with ongoing discomfort, recovering from an injury, or noticing changes in your performance, it may be time to consult a physiotherapist. Early intervention can help address issues before they become more serious and keep you moving with confidence. Dance injuries can interrupt your routine, but the right care can help you return stronger and more aware of your body. At Remarkable Physiotherapy in Markham, we are here to support your journey back to movement. If you are experiencing dance injuries or want to stay ahead of potential issues, book an appointment with our team today to learn more about how we can help you stay active and performing at your full potential.',
  },
  {
    slug: 'dizziness-treatment',
    intro: 'Dizziness can interfere with everyday activities, making simple movements like walking, turning your head, or even standing feel unsettling. If you are experiencing dizziness in Markham, it is important to understand the cause and explore options that can help restore stability and confidence in your daily life. At Remarkable Physiotherapy, we focus on identifying the root of dizziness and helping you regain control through targeted care.',
    whatIsIt: 'Dizziness is a broad term that describes sensations such as lightheadedness, unsteadiness, or a feeling of being off balance. Some people may feel like the room is spinning, while others may feel faint or disoriented. This condition can be occasional or persistent, ranging from mild discomfort to episodes that affect mobility and safety.',
    symptoms: ['A spinning or whirling sensation', 'Difficulty maintaining balance', 'Nausea or vomiting', 'Blurred vision', 'Headaches', 'Sensitivity to movement', 'Feeling faint or lightheaded'],
    symptomsDetails: [],
    causes: [],
    causesDetails: [
      { title: 'Inner Ear Disorders', description: 'The inner ear plays a key role in maintaining balance. Conditions such as benign paroxysmal positional vertigo (BPPV), vestibular neuritis, or labyrinthitis can lead to spinning sensations and imbalance.' },
      { title: 'Neck-Related Issues', description: 'Problems in the cervical spine, often linked to posture or injury, can disrupt signals to the brain, leading to dizziness.' },
      { title: 'Circulatory Changes', description: 'Fluctuations in blood pressure or reduced blood flow to the brain may cause lightheadedness, especially when standing up quickly.' },
      { title: 'Neurological Factors', description: 'Certain neurological conditions can interfere with coordination and balance, leading to ongoing dizziness.' },
      { title: 'Stress and Anxiety', description: 'Mental stress can also contribute to dizziness, often accompanied by a sense of disorientation or unsteadiness.' },
    ],
    treatmentApproach: 'Physiotherapy plays an important role in addressing dizziness, particularly when it is linked to balance disorders or musculoskeletal issues. At Remarkable Physiotherapy in Markham, care focuses on restoring proper function and reducing the frequency and intensity of symptoms.',
    treatmentDetails: [
      { title: 'Vestibular Rehabilitation', description: 'Vestibular rehabilitation is a targeted approach aimed at improving the function of the inner ear and balance system. Through specific movements and exercises, it helps the brain adapt to changes and reduce dizziness over time.' },
      { title: 'Balance and Coordination Training', description: 'Improving balance is essential for reducing the risk of falls. Exercises strengthen coordination and help the body respond more effectively to movement.' },
      { title: 'Canalith Repositioning Techniques', description: 'For individuals with BPPV, repositioning maneuvers can help move displaced particles within the inner ear back to their correct position, reducing spinning sensations.' },
      { title: 'Postural Correction', description: 'Poor posture can contribute to dizziness, especially when related to neck strain. Addressing posture helps improve alignment and reduces unnecessary stress on the body.' },
      { title: 'Strength and Mobility Exercises', description: 'Improving strength and flexibility supports overall stability and helps prevent recurring symptoms.' },
    ],
    benefits: [],
    practicalTips: ['Dizziness that persists for days or weeks.', 'Frequent episodes affecting daily life.', 'Difficulty walking or maintaining balance.', 'Dizziness accompanied by severe headaches or vision problems.', 'A recent injury followed by dizziness.'],
    practicalTipsDetails: [],
    whyChooseUs: [
      { title: 'Patient-Focused Care', description: 'Every individual’s condition is different, and care is planned accordingly to match specific needs and goals.' },
      { title: 'Evidence-Based Techniques', description: 'The methods used are grounded in current research and widely accepted physiotherapy practices.' },
      { title: 'One-on-One Attention', description: 'Sessions are structured to ensure focused time with a physiotherapist, allowing for proper assessment and guidance.' },
      { title: 'Focus on Lasting Results', description: 'Rather than addressing symptoms alone, the aim is to improve overall balance and function to reduce recurrence.' },
      { title: 'Convenient Markham Location', description: 'Located in Markham, the clinic is accessible for individuals seeking support for dizziness and related conditions.' },
    ],
    whenToSeekHelp: 'Living with dizziness can be frustrating and limiting, but it doesn’t have to control your daily routine. With the right approach, it is possible to improve balance, reduce symptoms, and feel more confident in your movements. If you are in Markham and dealing with dizziness, contact Remarkable Physiotherapy today to schedule your appointment. Our team is ready to help you move forward with clarity and stability.',
  },
];

async function run() {
  await connectDB();
  let updated = 0;
  for (const d of DETAILS) {
    const { slug, ...fields } = d;
    const res = await Condition.updateOne({ slug }, { $set: fields });
    if (res.matchedCount) updated++;
    else console.log('No condition found for slug:', slug);
  }
  console.log(`Updated exact detail content for ${updated}/${DETAILS.length} conditions`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

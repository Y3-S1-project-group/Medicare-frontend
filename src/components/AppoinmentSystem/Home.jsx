import React from 'react';
import { Calendar, Clock, Phone, Activity, Users, Stethoscope, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Card = ({ children, className }) => (
  <div className={`p-6 bg-white rounded-lg shadow ${className}`}>
    {children}
  </div>
);

const Home = () => {
  return (
    <div className="">

      {/* Services Section */}
      <section className="container px-4 py-16 mx-auto md:px-6">
        <h2 className="mb-12 text-5xl font-bold text-center text-blue-600">Welcome to Medicare Hospital</h2>
        <h2 className="mb-12 text-2xl font-bold text-center text-black">Our Services</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[ 
            { title: "Emergency Care", icon: Activity, desc: "24/7 emergency medical services" },
            { title: "Expert Doctors", icon: Users, desc: "Experienced healthcare professionals" },
            { 
              title: "Book your Appointment", 
              icon: Stethoscope, 
              desc: "Comprehensive medical care", 
              link: "/BookAppointment" 
            },
            { title: "Quality Care", icon: Award, desc: "High standards of patient care" },
            { 
              title: "Your Profile", 
              icon: Users, 
              desc: "View your Profile and Update", 
              link: "/profile" 
            },
            { 
              title: "Your Appointments", 
              icon: Award, 
              desc: "Previous Advanced Appointments", 
              link: "/ViewAppoinments" 
            }
          ].map((service, index) => (
            <Card key={index} className="transition-shadow hover:shadow-lg">
              <div className="mb-4">
                <h3 className="flex items-center gap-3 text-xl font-semibold">
                  <service.icon className="w-6 h-6 text-blue-600" />
                  {service.title}
                </h3>
              </div>
              <p className="mb-4 text-gray-600">{service.desc}</p>
              {service.link && (
                <div className="mt-4">
                  <Link
                    to={service.link}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    {service.title === 'Book your Appointment' ? 'Book Appointment' :
                     service.title === 'Your Appointments' ? 'View Appointments' : 'View Profile'}
                  </Link>
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Emergency Contact Section */}
      <div className="py-4 text-white bg-red-600">
        <div className="container flex items-center justify-center gap-4 px-6 mx-auto">
          <Phone className="w-6 h-6" />
          <span className="text-lg font-semibold">Emergency: 911</span>
        </div>
      </div>

    </div>
  );
};

export default Home;

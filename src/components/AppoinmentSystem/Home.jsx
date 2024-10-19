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
      <section className="py-16 container mx-auto px-4 md:px-6">
        <h2 className="text-5xl font-bold text-center mb-12 text-blue-600">Welcome to Medicare Hospital</h2>
        <h2 className="text-2xl font-bold text-center mb-12 text-black">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
              link: "/" 
            },
            { 
              title: "Your Appointments", 
              icon: Award, 
              desc: "Previous Advanced Appointments", 
              link: "/ViewAppoinments" 
            }
          ].map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-3">
                  <service.icon className="h-6 w-6 text-blue-600" />
                  {service.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">{service.desc}</p>
              {service.link && (
                <div className="mt-4">
                  <Link
                    to={service.link}
                    className="text-blue-600 font-semibold hover:underline"
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
      <div className="bg-red-600 text-white py-4">
        <div className="container mx-auto px-6 flex items-center justify-center gap-4">
          <Phone className="h-6 w-6" />
          <span className="text-lg font-semibold">Emergency: 911</span>
        </div>
      </div>

    </div>
  );
};

export default Home;

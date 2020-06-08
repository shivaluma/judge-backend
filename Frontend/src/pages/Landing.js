import React from 'react';
import NavButton from '../components/UI/NavButton';
import ListObj from '../components/Ipad/ListObj';
import {
  FaJava,
  FaJs,
  FaPython,
  FaGraduationCap,
  FaQuestion,
  FaTrophy,
  FaUsers,
  FaCode,
} from 'react-icons/fa';
import { ReactComponent as CppSvg } from '../assets/icons/cpp.svg';
import Card from '../components/UI/Card';
export default () => (
  <div>
    <div className='relative' style={{ height: '760px', marginTop: '-80px' }}>
      <div
        className='transform w-full h-full bg-green-300 skew-y-12 absolute top-0 left-0'
        style={{
          transformOrigin: '100%',
          background:
            'linear-gradient(-150deg, #222222 15%, #373737 70%, #3c4859 94%)',
          zIndex: '-1',
        }}
      ></div>
      {/* NavBar */}
      <div className='absolute pt-4 w-full' style={{ top: '80px' }}>
        <div className='h-24 w-full'>
          <div className='container flex justify-between'>
            <div className='text-xl font-normal text-white'>BrosCode</div>
            <nav className='flex'>
              <NavButton text='Premium' to='/premium' color='#fea116' />
              <NavButton text='Explore' to='/premium' color='#fff' />
              <NavButton text='Product' to='/premium' color='#fff' />
              <NavButton text='Sign In' to='/premium' color='#fff' />
            </nav>
          </div>
        </div>

        <FaJava
          className='z-10 absolute text-gray-600 opacity-50'
          style={{
            top: '100px',
            left: '20px',
            fontSize: '8rem',
            transform: 'rotate(8deg)',
          }}
        />

        <FaJs
          className='z-10 absolute text-gray-600 opacity-50'
          style={{
            top: '80px',
            right: '50px',
            fontSize: '8rem',
            transform: 'rotate(2deg)',
          }}
        />

        <FaPython
          className='z-10 absolute text-gray-600 opacity-50'
          style={{
            top: '280px',
            right: '150px',
            fontSize: '8rem',
            transform: 'rotate(-13deg)',
          }}
        />

        <CppSvg
          className='z-10 absolute h-32 w-32 text-gray-600 fill-current opacity-50'
          style={{
            top: '70px',
            left: '180px',
            fontSize: '8rem',
            transform: 'rotate(-13deg)',
          }}
        />

        {/* Content Header */}
        <div className='container flex'>
          <div className='lg:w-1/2'>
            <div
              className='mt-20 w-88 h-64 bg-white shadow-lg relative'
              style={{
                transform: 'rotate(-8deg)',
                height: '284px',
                width: '414px',
                borderRadius: '25px',
                transformOrigin: '50% 50%',
              }}
            >
              <div
                className='relative m-auto rounded-md border border-gray-300 flex'
                style={{
                  top: '8px',
                  width: 'calc(100% - 38px*2)',
                  height: 'calc(100% - 8px*2)',
                }}
              >
                <div className='w-9/12 p-1'>
                  <div className='bg-gray-200 p-1 w-full flex rounded-md'>
                    <div className='flex h-20 p-1 w-1/4'>
                      <div
                        className='w-full h-full bg-green-400 rounded-lg'
                        style={{
                          backgroundImage:
                            'linear-gradient(to right top, #7700c0, #7302ca, #6e06d5, #660ce0, #5c12eb)',
                        }}
                      ></div>
                    </div>
                    <div className='flex h-20 p-1 w-1/4'>
                      <div
                        className='w-full h-full bg-red-400 rounded-lg'
                        style={{
                          backgroundImage:
                            'linear-gradient(to right bottom, #0ddc99, #00dbb9, #00d9d4, #00d4e7, #20cff2)',
                        }}
                      ></div>
                    </div>
                    <div className='flex h-20 p-1 w-1/4'>
                      <div
                        className='w-full h-full bg-blue-400 rounded-lg'
                        style={{
                          backgroundImage:
                            'linear-gradient(to right bottom, #dc0db8, #e500a8, #ec0198, #f0108a, #f2207c)',
                        }}
                      ></div>
                    </div>
                    <div className='flex h-20 p-1 w-1/4'>
                      <div
                        className='w-full h-full bg-orange-400 rounded-lg'
                        style={{
                          backgroundImage:
                            'linear-gradient(to right bottom, #dccd0d, #e7b500, #ee9b00, #f28107, #f26520)',
                        }}
                      ></div>
                    </div>
                  </div>

                  <div
                    className='mt-2 p-2 w-full rounded-lg border border-gray-300'
                    style={{ height: 'calc(100% - 100px)' }}
                  >
                    <div className='border-b border-gray-200 p-2'>
                      <ListObj width={'34px'} />
                      <ListObj width={'72px'} red />
                      <ListObj width={'67px'} red />
                      <ListObj width={'54px'} />
                      <ListObj width={'97px'} />
                      <ListObj width={'123px'} red />
                      <ListObj width={'64px'} />
                    </div>
                  </div>
                </div>
                <div className='w-3/12 p-1'>
                  <div className='w-full h-full rounded-md border border-gray-300 p-1'>
                    <div className='h-4 w-full bg-gray-200 rounded-t-lg'></div>
                    <div className='p-1'>
                      <div
                        className='rounded-full bg-blue-200 mx-auto'
                        style={{ height: '60px', width: '60px' }}
                      ></div>
                    </div>
                    <div className='h-4 w-full bg-gray-200 rounded-b-lg'></div>
                    <div
                      className='bg-gray-400 mt-3 obj-animation'
                      style={{
                        height: '5px',
                        width: '24px',
                        borderRadius: '5px',
                      }}
                    ></div>
                    <div
                      className='bg-gray-400 mt-3 obj-animation-d-1'
                      style={{
                        height: '5px',
                        width: '65px',
                        borderRadius: '5px',
                      }}
                    ></div>
                    <div
                      className='bg-gray-400 mt-3 obj-animation-d-3'
                      style={{
                        height: '5px',
                        width: '45px',
                        borderRadius: '5px',
                      }}
                    ></div>
                    <div
                      className='bg-gray-400 mt-3'
                      style={{
                        height: '5px',
                        width: '24px',
                        borderRadius: '5px',
                      }}
                    ></div>
                    <div
                      className='bg-gray-400 mt-3 obj-animation-d-1'
                      style={{
                        height: '5px',
                        width: '24px',
                        borderRadius: '5px',
                      }}
                    ></div>
                    <div
                      className='bg-gray-400 mt-3 obj-animation-d-2'
                      style={{
                        height: '5px',
                        width: '33px',
                        borderRadius: '5px',
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Create Account */}
          <div className='lg:w-1/2'>
            <div className='mt-24 mx-auto text-center'>
              <h3 className='font-semibold text-4xl text-white capitalize w-full'>
                A new way to learn
              </h3>
              <p className='mt-8 text-lg text-gray-500'>
                BrosCode is the best platform to help you enhance your skills,
                expand your knowledge and prepare for technical interviews.
              </p>

              <button className='px-6 py-2 mt-8 bg-blue-600 rounded-full text-white focus:outline-none'>
                Create Account
              </button>
            </div>
          </div>
        </div>
        <div className='flex container mt-40'>
          <div className='lg:w-1/2 text-right'>
            <div className='flex items-center justify-end'>
              <span className='text-2xl text-teal-700'>Start Exploring!</span>
              <div class='badge teal transform scale-75'>
                <div class='circle'>
                  <FaGraduationCap className='mt-3 ml-3 fa-icon' />
                </div>
              </div>
            </div>
            <p
              className='text-base text-gray-600 mt-4 leading-loose'
              style={{ textIndent: '5rem' }}
            >
              Explore is a well-organized tool that helps you get the most out
              of BrosCode by providing structure to guide your progress towards
              the next step in your programming career.
            </p>
          </div>
          <div
            className='lg:w-1/2 relative mr-0 ml-auto'
            style={{ perspective: '600px', height: '300px', width: '260px' }}
          >
            <div
              className='absolute h-full w-full'
              style={{ transformOrigin: '0 50%' }}
            >
              <Card
                className='card-floating-2'
                left='-180px'
                zIndex={1}
                scale={0.6}
                backgroundImage={
                  'linear-gradient(to right bottom, #0ddc99, #00dbb9, #00d9d4, #00d4e7, #20cff2)'
                }
              />
            </div>
            <div
              className='absolute h-full w-full'
              style={{ transformOrigin: '0 50%' }}
            >
              <Card
                className='card-floating-1'
                left='-100px'
                zIndex={2}
                scale={0.8}
                backgroundImage={
                  'linear-gradient(to right bottom, #dc0db8, #e500a8, #ec0198, #f0108a, #f2207c)'
                }
              />
            </div>
            <div
              className='absolute h-full w-full'
              style={{ transformOrigin: '0 50%' }}
            >
              <Card
                className='card-floating-0'
                left='0'
                zIndex={3}
                scale={1}
                backgroundImage={
                  'linear-gradient(to right top, #7700c0, #7302ca, #6e06d5, #660ce0, #5c12eb)'
                }
              />
            </div>
          </div>
        </div>

        <div className='flex container mt-40'>
          <div className='lg:w-1/2 mr-20'>
            <div className='w-full relative'>
              <div class='badge orange transform scale-75'>
                <div class='circle'>
                  <FaQuestion className='mt-3 ml-3 fa-icon' />
                </div>
              </div>

              <div class='badge purple transform scale-75 -translate-x-12'>
                <div class='circle'>
                  <FaUsers className='mt-3 ml-3 fa-icon' />
                </div>
              </div>

              <div class='badge blue transform scale-75 -translate-x-24'>
                <div class='circle'>
                  <FaTrophy className='mt-3 ml-3 fa-icon' />
                </div>
              </div>
            </div>

            <h3 className='text-2xl text-blue-500 block'>
              Questions, Community & Contests
            </h3>

            <p className='text-md text-gray-800 leading-loose mt-3'>
              Over 1550 questions for you to practice. Come and join one of the
              largest tech communities with hundreds of thousands of active
              users and participate in our contests to challenge yourself and
              earn rewards.
            </p>
          </div>

          {/* END */}

          <div className='lg:w-1/2 mr-16'>
            <div className='w-full relative'>
              <div class='badge red transform scale-75'>
                <div class='circle'>
                  <FaCode className='mt-3 ml-3 fa-icon' />
                </div>
              </div>
            </div>

            <h3 className='text-2xl text-blue-500 block'>Developer</h3>

            <p className='text-md text-gray-800 leading-loose mt-3'>
              We now support 14 popular coding languages. At our core, BrosCode
              is about developers. Our powerful development tools such as
              Playground help you test, debug and even write your own projects
              online..
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

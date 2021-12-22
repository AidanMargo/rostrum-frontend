import '../componentStyles/landingStyles.css'
import {useRef, useEffect} from 'react'
import {gsap} from 'gsap'

export default function Landing () {

  const heroRef = useRef();
  const sliderRef = useRef();
  const headlineRef= useRef();


  useEffect(() => {
    gsap.to(heroRef.current, 1.3 , {height: '80%', ease: 'Power2.easeInOut'});
    gsap.to(heroRef.current, 1.5, {width: '80%', ease: 'Power2.easeInOut'});
    gsap.to(sliderRef.current, 1.5 , {left: '0%', ease: 'Power3.easeInOut'});
    gsap.to(headlineRef.current, 1.5, {opacity: '1', ease: 'Power2.easeInOut'})
  }, []);

  return (
    <>
    <section>
      <div className="hero" ref={heroRef}>  
        <h1 className="headline" ref={headlineRef}>Rostrum</h1>
        <img src="https://images.unsplash.com/photo-1627919617040-281311750887?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1191&q=80"
        alt="music"/>
      </div>
    </section>

    <div className="slider" ref={sliderRef}></div>

    </>
  )
}
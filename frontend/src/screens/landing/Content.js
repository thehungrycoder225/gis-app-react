import React, { useRef, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { gsap, Power3 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: 'Rationale',
    content: `The COVID-19 pandemic situation in the country is getting better based on daily reports of number of positive cases that shows decreasing pattern. Cities, municipalities and provinces are gradually starting to restore economic activities. Our province is again open to locally stranded individuals (LSI) and returning OFWs. Authorized persons outside residence (APOR) traveling to and from the province are increasing. This situation puts the province to higher possibility of spreading the COVID-19 virus just like what happened recently where confirmed positive cases increased.`,
  },
  {
    title: 'Objectives',
    content: `The main objective of this project is to provide the institution a
    tool that will provide relevant information for decision making
    towards prevention of COVID-19 transmission within the MSC
    community`,
  },
  {
    title: 'Research',
    content: `The School of Information and Computing Sciences started to
    develop an application software that will map the residential
    location of MSC employees and students. The system will be
    composed of a mobile application that will collect geospatial data
    from MSC employees and students, and a web-based application that
    will process the data and will provide needed information.`,
  },
];
const Content = () => {
  const revealRefs = useRef([]);
  revealRefs.current = [];
  useEffect(() => {
    revealRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
        },
        {
          duration: 1,
          autoAlpha: 1,
          ease: Power3.easeIn,
          scrollTrigger: {
            id: `section-${index + 1}`,
            trigger: el,
            start: 'top center+=100',
            toggleActions: 'paly none none reverse',
          },
        }
      );
    }, []);
  });
  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };
  return (
    <div>
      <Container className='content-height'>
        <Row className='justify-content-center text-justify '>
          {sections.map(({ title, content }) => (
            <Col
              className='col-md-12 col-lg-7 py-5 spacer-y-3 '
              key={title}
              ref={addToRefs}
            >
              <h1>{title}</h1>
              <p>{content}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Content;

import Title from './landing/Title';
import Content from './landing/Content';
import Team from './landing/Team';
// import '../stylesheets/landing-styles.css';

const Home = () => {
  return (
    <>
      <div className=' header'>
        <Title />
      </div>

      <Content />

      <Team />
    </>
  );
};

export default Home;

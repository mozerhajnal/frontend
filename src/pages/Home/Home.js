import golden from '../../assets/golden.jpg';
import rings from '../../assets/rings.jpg';
import yellowring from '../../assets/yellowring.jpg';
import cp from '../../assets/cp.jpg';
import wood from '../../assets/wood.jpg';
import aurora from '../../assets/aurora.jpg';
import ram from '../../assets/ram.jpg';
import HomeItem from './HomeItem';
import NewsLetter from '../../components/NewsLetter';
import './Home.scss';

export default function Home() {
  return (
    <>
      <section className="mt-5 mb-5 container">
          <div className="row g-3 mb-3">
            <HomeItem colName="col-md-5" imgUrl='https://trinwoodart.s3.eu-west-2.amazonaws.com/uploadImages-1654425738852.jpg' alt={cp}/>
            <HomeItem colName="col-md-7" imgUrl={rings} alt={rings}/>
          </div>
          <div className="row g-3 mb-3">
            <HomeItem colName="col-md-4" imgUrl={aurora} alt={aurora}/>
            <HomeItem colName="col-md-4" imgUrl={yellowring} alt={yellowring}/>
            <HomeItem colName="col-md-4" imgUrl={wood} alt={wood}/>
          </div>
          <div className="row g-3 mb-3">
            <HomeItem colName="col-md-7" imgUrl={golden} alt={golden}/>
            <HomeItem colName="col-md-5" imgUrl={ram} alt={ram}/>
          </div>
      </section>
      <NewsLetter/>
    </>
  );
}

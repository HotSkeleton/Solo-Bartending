import {Link} from "react-router-dom";
import "../index.css";

const Home = () => {
  
  const linkClass = 'mt-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-base font-medium text-white transition hover:bg-emerald-800'

  return (
    <>
      <div>
        <div className="page-flexbox-main">
          <h1 className="page-header">Welcome!</h1>
        </div>
      </div>
    </>
);

};

export default Home;

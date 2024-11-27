import Header from "../Header/Header";
import VacancyList from "../VacancyList/VacancyList";

const Home = ({vacancies}) => {
  return <>
<div className="container-fluid">
  <div className="container ">
 <div className="row gap-5 p-3">
 <VacancyList vacancies={vacancies}/>
 </div>
  </div>
</div>
  </>;
};
export default Home;

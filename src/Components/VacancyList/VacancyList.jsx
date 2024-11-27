import Vacancy from "../Vacancy/Vacancy";

const VacancyList = ({vacancies}) => {
  return <>
{vacancies.map((v,index)=>(
  <Vacancy
 key={index}
 Id={v.id}
  Title={v.title}
  Description={v.description}
  StartDate={v.startDate}
  EndDate={v.endDate}
   />))}
  </>;
};
export default VacancyList;

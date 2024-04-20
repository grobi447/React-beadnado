import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";
import { useState } from "react";

const HouseholdSalaryCalculator = () => {
  const defaultState = {
    nev: "Név",
    ber: "0",
    szja: false,
    hazas: false,
    datum: "",
    adokedvezmeny: false,
    csaladikedvezmeny: false,
    eltartott: 0,
    kedvezmenyezett: 0
  };

  const [users, setUsers] = useState([]);

  const addUser = () => {
    const newUser = { ...defaultState };
    setUsers(prevUsers => [...prevUsers, newUser]);
  };
  const [activeUserIndex, setActiveUserIndex] = useState(-1);
  const onUserSelect = (index) => {
    setActiveUserIndex(index);
  };
  
  return (
    <>
      <header>
        <FamilyMemberTabs onAddUser={addUser} users={users} onUserSelect={onUserSelect}/>
      </header>
      <main>
        {users[activeUserIndex] && <SalaryCalculator  avtiveUser={users[activeUserIndex]}/>}
        <HouseholdSummary />
      </main>
    </>
  );
};

export default HouseholdSalaryCalculator;

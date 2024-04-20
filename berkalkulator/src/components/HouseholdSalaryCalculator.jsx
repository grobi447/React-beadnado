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

  return (
    <>
      <header>
        <FamilyMemberTabs onAddUser={addUser} users={users}/>
      </header>
      <main>
        <SalaryCalculator />
        <HouseholdSummary />
      </main>
    </>
  );
};

export default HouseholdSalaryCalculator;

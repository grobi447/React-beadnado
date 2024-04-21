import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";
import { useState } from "react";

const HouseholdSalaryCalculator = () => {
  const defaultState = {
    nev: "Név",
    brutto: 0,
    szja: false,
    hazas: false,
    jogosult: false,
    datum: "",
    adokedvezmeny: false,
    csaladikedvezmeny: false,
    eltartott: 0,
    kedvezmenyezett: 0,
    netto: 0,
  };

  const [users, setUsers] = useState([]);
  const [activeUserIndex, setActiveUserIndex] = useState(-1);

  const addUser = () => {
    const newUser = { ...defaultState };
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const onUserSelect = (index) => {
    setActiveUserIndex(index);
  };

  const updateActiveUser = (field, value) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[activeUserIndex] = {
        ...updatedUsers[activeUserIndex],
        [field]: value,
      };
      console.log(updatedUsers);
      return updatedUsers;
    });
  };

  return (
    <>
      <header>
        <FamilyMemberTabs
          onAddUser={addUser}
          users={users}
          onUserSelect={onUserSelect}
        />
      </header>
      <main>
        {users[activeUserIndex] && (
          <SalaryCalculator
            activeUser={users[activeUserIndex]}
            updateActiveUser={updateActiveUser}
          />
        )}
        <HouseholdSummary />
      </main>
    </>
  );
};

export default HouseholdSalaryCalculator;

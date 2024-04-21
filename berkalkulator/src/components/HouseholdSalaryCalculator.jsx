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

      const netIncome = calculateNetIncome(updatedUsers[activeUserIndex]);
      updatedUsers[activeUserIndex] = {
        ...updatedUsers[activeUserIndex],
        netto: netIncome,
      };

      console.log(updatedUsers);
      return updatedUsers;
    });
  };

const calculateNetIncome = (user) => {
  let személyiTax = 0;
  let tbTax = user.brutto * 0.185;

  if (user.szja && user.brutto > 499952) {
    const taxableIncome = user.brutto - 499952;
    személyiTax = taxableIncome * 0.15;
  } else if (!user.szja) {
    személyiTax = user.brutto * 0.15;
  }

  if (user.adokedvezmeny) {
    személyiTax = Math.max(0, személyiTax - 77300);
  }

  let netIncome = user.brutto - személyiTax - tbTax;

  if(user.hazas && user.jogosult) {
    netIncome += 5000;
  }
  if(user.csaladikedvezmeny) {
    let kedvezmeny = 0;
    if(user.kedvezmenyezett === 1) {
      kedvezmeny = 10000 * user.eltartott;
    } else if(user.kedvezmenyezett === 2) {
      kedvezmeny = 20000 * user.eltartott;
    } else if(user.kedvezmenyezett >= 3) {
      kedvezmeny = 33000 * user.eltartott;
    }
    netIncome += kedvezmeny;
  }

  return Math.round(netIncome);
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

const HouseholdSummary = ({ users, activeUserIndex }) => {
  return (
    <div className="w-1/2 pt-2 bg-white rounded-[12px] bg-[#e2e8f0]">
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold">Háztartás összesített jövedelme</h1>
        <table className="w-1/2 mx-auto text-left mt-10 bg-white ">
          <thead>
            <tr>
              <th className="border border-gray-300">Családtag</th>
              <th className="border border-gray-300">Nettó bér</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className={`border border-gray-300 ${
                  index === activeUserIndex ? "bg-[#f1f5f9]" : ""
                }`}
              >
                <td>{user.nev}</td>
                <td>{user.netto}</td>
              </tr>
            ))}
            <tr>
              <td className="border border-gray-300">Összesen:</td>
              <td className="border border-gray-300">
                {users.reduce((total, user) => total + user.netto, 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HouseholdSummary;

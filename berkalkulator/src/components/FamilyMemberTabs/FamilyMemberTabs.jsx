import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const FamilyMemberTabs = ({ onAddUser, users, onUserSelect }) => {
  return (
    <div>
      <Tabs className="w-[400px]">
        <TabsList>
        {users.map((user, index) => (
            <TabsTrigger key={index} value={index} onClick={() => onUserSelect(index)} >{user.nev} </TabsTrigger>
          ))}
          <Button variant='outline' onClick={onAddUser}>+</Button>
        </TabsList>
      </Tabs>
      
    </div>
  );
};

export default FamilyMemberTabs;
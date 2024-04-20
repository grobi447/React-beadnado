import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
const SalaryCalculator = ({ activeUser, updateActiveUser }) => {
  const handleInput = (event) => {
    const { name, value } = event.target;
    updateActiveUser(name, value);
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{activeUser.nev} bérének kiszámítása</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Családtag neve</Label>
              <Input
                name="nev"
                id="name"
                value={activeUser.nev}
                onInput={handleInput}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
};

export default SalaryCalculator;

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

  function handlePercentageChange(percentage) {
    updateActiveUser(
      "ber",
      Math.round(activeUser.ber * (1 + percentage / 100))
    );
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{activeUser.nev} bérének kiszámítása</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label>Családtag neve</Label>
              <Input
                name="nev"
                id="name"
                value={activeUser.nev}
                onInput={handleInput}
                type="text"
              />
              <CardDescription>Add meg a családtag nevét</CardDescription>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Brutto bér</Label>
              <Input
                name="ber"
                id="ber"
                value={activeUser.ber}
                onInput={handleInput}
                type="number"
              />
              <CardDescription>Add meg a bruttó béredet</CardDescription>
              <input
                type="range"
                name="ber"
                id="ber"
                min="0"
                max="1000000"
                value={activeUser.ber}
                onInput={handleInput}
              />
            </div>
            <div className="flex justify-center space-x-1.5">
              <Button type="button" onClick={() => handlePercentageChange(-1)}>
                -1%
              </Button>
              <Button type="button" onClick={() => handlePercentageChange(-5)}>
                -5%
              </Button>
              <Button type="button" onClick={() => handlePercentageChange(1)}>
                +1%
              </Button>
              <Button type="button" onClick={() => handlePercentageChange(5)}>
                +5%
              </Button>
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

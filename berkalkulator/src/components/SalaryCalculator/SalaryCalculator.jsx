import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

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
    <Card className="w-[650px]">
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
            <Label>Kedvezmények</Label>
            <div className="flex items-center space-x-2">
              <Switch />
              <Label>25 év alattiak SZJA mentessége</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch />
              <Label>Friss Házasok kedvezménye</Label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Dátum módosítása</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogDescription>
                      A kedvezmény először a házasságkötést követő hónapra
                      vehető igénybe és a házassági életközösség alatt
                      legfeljebb 24 hónapon kersztül jár.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Label htmlFor="name" className="text-left">
                      Add meg a házasságkötés dátumát:
                    </Label>
                    <Input
                      id="name"
                      defaultValue="YYYY/MM/DD"
                      className="col-span-3"
                    />
                    <DialogDescription>Például: 2000/10/25</DialogDescription>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Mentés</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Badge variant ='green'>Jogosult</Badge>
              <Badge variant='destructive'>Nem jogosult</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Switch />
              <Label>Személyi adókedvezmény</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch />
              <Label>Családi kedvezmény</Label>
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

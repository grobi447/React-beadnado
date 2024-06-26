import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
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
import { Slider } from "@/components/ui/slider";
const SalaryCalculator = ({ activeUser, updateActiveUser, deleteUser }) => {
  const handleInput = (event) => {
    const { name, value } = event.target;
    updateActiveUser(name, value);
  };

  const [isOpen, setIsOpen] = useState(false);
  const currentDate = new Date();
  function handlePercentageChange(percentage) {
    updateActiveUser(
      "brutto",
      Math.round(activeUser.brutto * (1 + percentage / 100))
    );
  }
  const incrementEltartott = () => {
    updateActiveUser("eltartott", activeUser.eltartott + 1);
  };

  const decrementEltartott = () => {
    if (activeUser.eltartott === 0) return;
    updateActiveUser("eltartott", activeUser.eltartott - 1);
  };

  const incrementKedvezmenyezett = () => {
    if (activeUser.kedvezmenyezett === activeUser.eltartott) return;
    updateActiveUser("kedvezmenyezett", activeUser.kedvezmenyezett + 1);
  };

  const decrementKedvezmenyezett = () => {
    if (activeUser.kedvezmenyezett === 0) return;
    updateActiveUser("kedvezmenyezett", activeUser.kedvezmenyezett - 1);
  };
  const handleDateChange = (event) => {
    const currentDate = new Date();
    const marriageDate = new Date(event.target.value);

    const monthsDifference =
      currentDate.getMonth() -
      marriageDate.getMonth() +
      12 * (currentDate.getFullYear() - marriageDate.getFullYear());

    if (monthsDifference >= 1 && monthsDifference <= 24) {
      updateActiveUser("jogosult", true);
    } else {
      updateActiveUser("jogosult", false);
    }
  };
  return (
    <Card className="w-[650px] bg-[#e2e8f0]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{activeUser.nev} bérének kiszámítása</CardTitle>
          <Button variant="outline" className="text-xs" onClick={deleteUser}>
            <Trash2 />
          </Button>
        </div>
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
              <Label>Bruttó bér</Label>
              <Input
                name="brutto"
                id="brutto"
                value={activeUser.brutto}
                onInput={handleInput}
                type="numbrutto"
              />
              <CardDescription>Add meg a bruttó béredet</CardDescription>
              <Slider
                value={[activeUser.brutto]}
                max={1000000}
                step={1}
                min={0}
                onValueChange={(value) => updateActiveUser("brutto", value)}
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
              <Switch
                checked={activeUser.szja}
                onCheckedChange={(isChecked) =>
                  updateActiveUser("szja", isChecked)
                }
              />
              <Label>25 év alattiak SZJA mentessége</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={activeUser.hazas}
                onCheckedChange={(isChecked) =>
                  updateActiveUser("hazas", isChecked)
                }
              />
              <Label>Friss Házasok kedvezménye</Label>
              <Dialog open={isOpen}>
                <DialogTrigger onClick={() => setIsOpen(true)}>
                  <Badge>Dátum módosítása</Badge>
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
                    <Label className="text-left">
                      Add meg a házasságkötés dátumát:
                    </Label>
                    <Input
                      id="date"
                      defaultValue="YYYY/MM/DD"
                      onChange={handleDateChange}
                      className="col-span-3"
                    />
                    <DialogDescription>Például: 2000/10/25</DialogDescription>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={() => setIsOpen(false)}>
                      Mentés
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {activeUser.hazas &&
                (activeUser.jogosult ? (
                  <Badge variant="green">Jogosult</Badge>
                ) : (
                  <Badge variant="destructive">Nem jogosult</Badge>
                ))}
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={activeUser.adokedvezmeny}
                onCheckedChange={(isChecked) =>
                  updateActiveUser("adokedvezmeny", isChecked)
                }
              />
              <Label>Személyi adókedvezmény</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={activeUser.csaladikedvezmeny}
                onCheckedChange={(isChecked) =>
                  updateActiveUser("csaladikedvezmeny", isChecked)
                }
              />
              <Label>Családi kedvezmény</Label>
            </div>
            {activeUser.csaladikedvezmeny && (
              <div className="flex items-center">
                <Minus onClick={decrementEltartott} />
                {activeUser.eltartott}
                <Plus onClick={incrementEltartott} />
                <Label>Eltartott, ebből kedvezményezett</Label>
                <Minus onClick={decrementKedvezmenyezett} />
                {activeUser.kedvezmenyezett}
                <Plus onClick={incrementKedvezmenyezett} />
              </div>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col justify-center">
        <h1>Számított nettó bér</h1>
        <Button>{activeUser.netto} Ft</Button>
      </CardFooter>
    </Card>
  );
};

export default SalaryCalculator;

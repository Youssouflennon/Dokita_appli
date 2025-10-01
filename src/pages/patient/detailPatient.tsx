import { Button } from "../../components/components/ui/button";
import React, { useEffect, useState } from "react";
import { FaEllipsisV, FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/components/ui/card";
import { Input } from "../../components/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/components/ui/table";
import { Badge } from "../../components/components/ui/badge";
import { Checkbox } from "../../components/components/ui/checkbox";
import { ScrollArea } from "../../components/components/ui/scroll-area";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/components/ui/popover";
import { CustomCheckbox } from "../../components/components/ui/customcheck";
import { CustomSwitch } from "../../components/components/ui/customswitch";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../components/components/ui/form";
import { useForm } from "react-hook-form";
import TMModal from "../../components/components/ui/TM_Modal";
import SubscriptionDetails from "./detailAbonnement";
import { Dialog, Transition } from "@headlessui/react";
import { Label } from "../../components/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/components/ui/select";
import useStoreOneUser from "src/store/users/getOne";
import TotalLoad from "../../components/components/totalLoad";
import useStoreUpdateUser from "src/store/users/update";
import { useToast } from "../../components/hooks/use-toast";

type FormValues = {
  firstName: string;
  lastName: string;
  sex: string;
  email: string;
  phone: string;
  address: string;
};

const DetailPatient = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      sex: "MALE",
      email: "",
      phone: "",
      address: "",
    },
  });

  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [isSwitched, setIsSwitched] = useState(false);
  const [address, setAdresse] = useState("");
  const [date, setDate] = useState("");
  const [statut, setStatut] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [detailCard, setDetailCard] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const { id } = useParams();
  const { OneUser, fetchOneUser, loadingOneUser } = useStoreOneUser();
  const { updateUsers } = useStoreUpdateUser();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (id) {
      fetchOneUser(id);
    }
  }, [id, fetchOneUser]);

  useEffect(() => {
    if (OneUser) {
      form.reset({
        firstName: OneUser.firstName || "",
        lastName: OneUser.lastName || "",
        phone: OneUser.phone || "",
        email: OneUser?.email || "",
        sex: OneUser.sex || "MALE",
        address: OneUser?.address || "",
      });
    }
  }, [OneUser, form]);

  if (loadingOneUser) {
    return <TotalLoad />;
  }

  const onSubmit = async (data: any) => {
    console.log("data", data);

    try {
      setLoading(true);

      if (id)
        await updateUsers(id, {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          sex: data.sex,
          address: data.address,
        }); // ton action doit gérer l'envoi de FormData
      navigate("/patients");
      toast({
        title: "Modification réussie",
        description: "Bienvenue sur Dokita 🚀",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Erreur Modification",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <h1
        className="text-xl font-semibold mb-4 cursor-pointer"
        onClick={() => {
          navigate(-1);
        }}
      >
        ← {OneUser?.firstName}
      </h1>

      {/* Informations Générales */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Informations générales</CardTitle>

          {!editMode ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditMode(true)}
            >
              <FaEdit className="mr-2" /> Modifier les informations
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                className="rounded-full text-white"
                disabled={loading}
                onClick={form.handleSubmit(onSubmit)}
              >
                {loading ? "Enregistrement..." : "Enregistrer"}
              </Button>
              <Button
                className="rounded-full"
                variant="outline"
                onClick={() => {
                  setEditMode(false);
                  form.reset(); // on remet les valeurs initiales si on annule
                }}
              >
                Annuler
              </Button>
            </div>
          )}
        </CardHeader>

        <Form {...form}>
          <CardContent className="grid grid-cols-1 md:grid-cols-1 gap-4 text-sm">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom(s)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nom complet"
                      {...field}
                      disabled={!editMode} // champs non modifiable
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom(s)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Prénom"
                      {...field}
                      disabled={!editMode}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexe</FormLabel>
                  <FormControl>
                    <Input placeholder="Sexe" {...field} disabled={!editMode} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Adresse email"
                      {...field}
                      disabled={!editMode}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Numéro de téléphone"
                      {...field}
                      disabled={!editMode}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Adresse physique"
                      {...field}
                      disabled={!editMode}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Form>
      </Card>

      {/* Liste des docteurs */}
      <Card className="mb-6 bg-gray-100 border-0">
        <CardHeader className="flex flex-col items-start  justify-start">
          <CardTitle>Liste des Docteurs Abonnés</CardTitle>
          <div className="flex items-center justify-between w-full mb-1 border border-gray-200 p-2 bg-white">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher"
                className="pl-10 pr-4 py-1 rounded-md bg-white border border-gray-300 focus:outline-none"
              />
              <FaSearch className="absolute top-3 left-3 text-gray-400" />
            </div>{" "}
            <div className="space-x-2">
              <Button variant="outline" size="sm">
                <img
                  src="/Iconfleche.svg"
                  // alt="Avatar"
                  className="h-6 w-6 rounded-full"
                />
              </Button>

              {/*    <Button variant="outline" size="sm">
            <img
              src="/iconFil.svg"
              // alt="Avatar"
              className="h-6 w-6 rounded-full"
            />{" "}
          </Button> */}

              <Popover>
                <PopoverTrigger className=" bg-white text-left px-4 py-1 text-sm  border rounded-md hover:bg-gray-100">
                  <img
                    src="/iconFil.svg"
                    // alt="Avatar"
                    className="h-6 w-6 rounded-full"
                  />{" "}
                </PopoverTrigger>
                <PopoverContent className="">
                  <div className="p-4 space-y-4">
                    <h2 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      Filtre
                    </h2>

                    {/* Adresse */}
                    <div className="space-y-1">
                      <Label htmlFor="address">Adresse</Label>
                      <Select value={address} onValueChange={setAdresse}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sélectionner une address" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="adresse1">Adresse 1</SelectItem>
                          <SelectItem value="adresse2">Adresse 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Date */}
                    <div className="space-y-1">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        id="date"
                      />
                    </div>

                    {/* Statut */}
                    <div className="space-y-1">
                      <Label htmlFor="statut">Statut</Label>
                      <Select value={statut} onValueChange={setStatut}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sélectionner le statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="valide">Validé</SelectItem>
                          <SelectItem value="en_cours">En cours</SelectItem>
                          <SelectItem value="rejeté">Rejeté</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Boutons */}
                    <div className="flex justify-between pt-2 ">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setAdresse("");
                          setDate("");
                          setStatut("");
                        }}
                        className="rounded-full"
                      >
                        Réinitialiser
                      </Button>
                      <Button className="bg-[#1d3557] hover:bg-[#16314e] rounded-full text-white">
                        Appliquer
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table className="bg-white">
            <TableHeader>
              <TableRow>
                <TableHead>
                  <CustomCheckbox
                    label=""
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />{" "}
                </TableHead>
                <TableHead>name</TableHead>
                <TableHead>specialty</TableHead>
                <TableHead>email</TableHead>
                <TableHead>phone</TableHead>
                <TableHead>address</TableHead>
                <TableHead>status</TableHead>

                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {OneUser?.abonnementsP.map((d: any, i: any) => (
                <TableRow
                  key={i}
                  className="cursor-pointer"
                  onClick={() => {
                    // navigate("/detail_patient");
                    setDetailCard(true);
                  }}
                >
                  <TableCell>
                    <CustomCheckbox
                      label=""
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                    />{" "}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <span className="font-medium">{d.medecin.firstName}</span>
                    <span className="font-medium">{d.medecin.lastName}</span>
                  </TableCell>
                  <TableCell className="text-blue-600 underline">
                    {d.specialty}
                  </TableCell>
                  <TableCell>{d.medecin.email}</TableCell>
                  <TableCell>{d.phone}</TableCell>
                  <TableCell>{d.address}</TableCell>
                  <TableCell className="bg-green-200 text-green-600 rounded-full p-2 inline-block">
                    {d.status}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Popover>
                      <PopoverTrigger className=" bg-gray-200 text-left px-4 py-1 text-sm  border rounded-md hover:bg-gray-100">
                        <MoreHorizontal className="w-4 h-4" />
                      </PopoverTrigger>
                      <PopoverContent className="p-4 w-full">
                        <ul className="space-y-2 cursor-pointer">
                          <li
                            className="flex items-center gap-2 p-2 border-b last:border-none"
                            onClick={(event) => {
                              event.stopPropagation();

                              // setSelectedUser(item.id);
                              setIsOpen(true);
                            }}
                            // navigate(0);
                          >
                            <FaTrash className="text-red-600 text-lg cursor-pointer" />
                            <span className="font-medium text-red-500 text-sm hover:text-red-600 transition-colors duration-200">
                              supprimer
                            </span>
                          </li>
                        </ul>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Activités récentes */}
      <Card>
        <CardHeader>
          <CardTitle>Activités récentes</CardTitle>
        </CardHeader>
        <CardContent className="text-xs space-y-1">
          <div>✅ Création d’un nouveau kiosque — Jan 19, 2024</div>
          <div>✏️ Modification d’une information — Jan 19, 2024</div>
          <div>📆 Prise de rendez-vous — Jan 19, 2024</div>
        </CardContent>
      </Card>

      <Card className="mt-2">
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent className="text-xs flex flex-col gap-8">
          <div>
            {" "}
            <span className="bg-green-200 text-green-600 rounded-full p-2">
              * Connexion
            </span>{" "}
            — Jan 19, 2024
          </div>
          <div>
            <span className="bg-red-200 text-red-600 rounded-full p-2">
              * Deonnexion
            </span>{" "}
            — Jan 19, 2024
          </div>

          <div>
            <span className="bg-green-200 text-green-600 rounded-full p-2">
              * Connexion
            </span>{" "}
            — Jan 19, 2024
          </div>
        </CardContent>
      </Card>

      <TMModal
        isOpen={detailCard}
        onClose={() => {
          setDetailCard(false);
          // window.location.reload();
        }}
        // title="Detail carte"
        size="md"
        height={70}
      >
        <SubscriptionDetails
        /*   idcartes={idCarte}
          descriptions={descriptions}
          nomCart={nomCart} */
        />
      </TMModal>

      <Transition show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
            <Dialog.Panel className="bg-white p-6 rounded-lg shadow-xl">
              <Dialog.Title className="text-lg font-bold">
                {"admin.confirm_delete"}
              </Dialog.Title>
              <p className="mt-2">{"admin.confirm_delete_message"}</p>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  className="bg-gray-300 px-4 py-2 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {"admin.cancel"}
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                  //  onClick={handleDeleteUser}
                  // disabled={loadingdeleteUsers}
                >
                  {/*  {loadingdeleteUsers ? t("admin.deleting") : t("admin.delete")} */}{" "}
                  supprimer
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default DetailPatient;

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-gray-500 text-xs">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    Active: "success",
    Expiré: "destructive",
    Autres: "secondary",
    "10 jours": "warning",
    Supprimer: "outline",
  };

  const color = variants[status] || "secondary";

  return <Badge>{status}</Badge>;
}

const doctors = [
  {
    name: "Nana Momo",
    specialty: "Cardiologue",
    email: "darlenemartin@gmail.com",
    phone: "+237 691 234 547",
    address: "Douala, Cameroun",
    avatar: "https://i.pravatar.cc/40?img=3",
    status: "Active",
  },
  {
    name: "Jean donfack",
    specialty: "Cardiologue",
    email: "jennywilson@gmail.com",
    phone: "+237 691 234 547",
    address: "Douala, Cameroun",
    avatar: "https://i.pravatar.cc/40?img=4",
    status: "Autres",
  },
  {
    name: "Mbobo Kola",
    specialty: "Cardiologue",
    email: "wadewarren@gmail.com",
    phone: "+237 691 234 547",
    address: "Douala, Cameroun",
    avatar: "https://i.pravatar.cc/40?img=5",
    status: "Supprimer",
  },
  {
    name: "Djapo",
    specialty: "Cardiologue",
    email: "albertflores@gmail.com",
    phone: "+237 691 234 547",
    address: "Douala, Cameroun",
    avatar: "https://i.pravatar.cc/40?img=6",
    status: "10 jours",
  },
  {
    name: "Sipoua Guru",
    specialty: "Cardiologue",
    email: "eleonorapena@gmail.com",
    phone: "+237 691 234 547",
    address: "Douala, Cameroun",
    avatar: "https://i.pravatar.cc/40?img=7",
    status: "Expiré",
  },
];

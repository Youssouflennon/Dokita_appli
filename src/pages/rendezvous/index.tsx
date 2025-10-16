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
import { Switch } from "../../components/components/ui/switch";
import { Button } from "../../components/components/ui/button";
import { Checkbox } from "../../components/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/components/ui/avatar";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  PlusCircle,
  CalendarIcon,
  ChevronDown,
} from "lucide-react";
import { Input } from "../../components/components/ui/input";
import { CustomCheckbox } from "../../components/components/ui/customcheck";
import { CustomSwitch } from "../../components/components/ui/customswitch";
import React, { useEffect, useState } from "react";
import { FaEdit, FaSearch, FaTrash, FaUser } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import DetailAbonnement from "./detailRendezVous";
import TMModal from "../../components/components/ui/TM_Modal";
import DetailRendez from "./detailRendezVous";
import TotalLoad from "../../components/components/totalLoad";
import { Label } from "../../components/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/components/ui/select";
import useStoreAllReservation from "src/store/reservation/getAll";
import Pagination from "../../components/components/ui/pagination";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
} from "../../components/components/ui/form";
import { Calendar } from "../../components/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "../../components/lib/utils";

type FilterFormValues = {
  date?: Date;
};

export default function RendezVous() {
  const form = useForm<FilterFormValues>({
    defaultValues: { date: undefined },
  });
  const [isChecked, setIsChecked] = useState(false);
  const [isSwitched, setIsSwitched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [detailCard, setDetailCard] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const { AllReservation, loadingAllReservation, fetchAllReservation, count } =
    useStoreAllReservation();

  console.log("AllReservation", AllReservation);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    fetchAllReservation({
      page,
      limit: 6,
      q: debouncedSearch,
    });
  }, [page, debouncedSearch, fetchAllReservation]);

  if (loadingAllReservation) {
    return <TotalLoad />;
  }

  return (
    <div className="flex flex-col p-4 h-full">
      <div className="flex justify-end">
        <div className="flex items-center gap-2 bg-primary p-2 rounded-full my-3 cursor-pointer text-white">
          <PlusCircle className="w-4 h-4" /> Ajouter un Rendez-vous
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">
            <div className="flex items-center justify-between ">
              <div>
                <p className="text-lg">Nombre total de rendez_vous</p>

                <p className="text-2xl font-bold">
                  1,822{" "}
                  <span className="text-green-500 text-sm ml-1">+5.2%</span>
                </p>
              </div>

              <Button variant="outline" size="sm">
                <FaUser className="h-5 w-5" />
              </Button>
            </div>{" "}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col  gap-4  p-2">
          <div className="flex items-center justify-between border border-gray-200 p-1 ">
            <p className="text-sm text-muted-foreground">
              +140 ce dernier mois
            </p>

            <Button variant="outline" size="icon">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>

          {/*    <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-5 h-5" />
            </Button> */}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between mb-5 border border-gray-200 p-2 bg-white">
        <div className="relative flex gap-2 ">
          <input
            type="text"
            placeholder="Rechercher"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-1 rounded-md bg-white border border-gray-300 focus:outline-none"
          />
          <FaSearch className="absolute top-3 left-3 text-gray-400" />

          <Popover>
            <PopoverTrigger className="flex bg-gray-100 text-left px-4 py-1 text-sm border rounded-md hover:bg-gray-100 gap-1">
              <img
                src="/iconFil.svg"
                // alt="Avatar"
                className="h-6 w-6 rounded-full"
              />{" "}
              <span>date</span>
              <ChevronDown className="w-5 h-5 text-gray-600" />
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="p-4 space-y-4">
                <Form {...form}>
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      // 👉 Quand on clique sur "Réinitialiser"
                      form.reset(); // vide la date
                      fetchAllReservation({
                        page: 1,
                        limit: 6,
                        q: debouncedSearch,
                        date: undefined,
                      });
                      setPage(1);
                    }}
                  >
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <Label>Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value
                                    ? format(field.value, "dd MMMM yyyy", {
                                        locale: fr,
                                      })
                                    : "Choisir une date"}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                locale={fr}
                                onSelect={(date) => {
                                  // ✅ On met à jour la valeur du formulaire
                                  field.onChange(date);

                                  // ✅ Et on lance automatiquement la requête
                                  const formattedDate = date
                                    ? date.toISOString().split("T")[0]
                                    : undefined;

                                  fetchAllReservation({
                                    page: 1,
                                    limit: 6,
                                    q: debouncedSearch,
                                    date: formattedDate,
                                  });
                                  setPage(1);
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger className="flex bg-gray-100 text-left px-4 py-1 text-sm border rounded-md hover:bg-gray-100 gap-1">
              <img
                src="/iconFil.svg"
                // alt="Avatar"
                className="h-6 w-6 rounded-full"
              />{" "}
              <span>Type reservation</span>
              <ChevronDown className="w-5 h-5 text-gray-600" />
            </PopoverTrigger>
            <PopoverContent className="">
              <div className="p-4 space-y-4">
                {/* Type */}
                <div className="space-y-1">
                  <Select
                    onValueChange={(value) =>
                      fetchAllReservation({
                        type: value as "CALL" | "IN_PERSON",
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CALL">CALL</SelectItem>
                      <SelectItem value="IN_PERSON">IN_PERSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger className="flex bg-gray-100 text-left px-4 py-1 text-sm border rounded-md hover:bg-gray-100 gap-1">
              <img
                src="/iconFil.svg"
                // alt="Avatar"
                className="h-6 w-6 rounded-full"
              />{" "}
              <span>Statut</span>
              <ChevronDown className="w-5 h-5 text-gray-600" />
            </PopoverTrigger>
            <PopoverContent className="">
              <div className="p-4 space-y-4">
                {/* Type */}
                <div className="space-y-1">
                  <Select
                    onValueChange={(value) =>
                      fetchAllReservation({
                        status: value as "PENDING" | "COMPLETED" | "CANCELLED",
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner le statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">PENDING</SelectItem>
                      <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                      <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>{" "}
        <button
          className="rounded-full text-white bg-primary"
          onClick={() => {
            fetchAllReservation({ page, limit: 6, q: debouncedSearch });
          }}
        >
          Annuler filtre
        </button>
      </div>

      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <CustomCheckbox
                label=""
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
            </TableHead>
            <TableHead>Nom du Docteur</TableHead>
            <TableHead>Nom du Patient</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Lieu de Rendez-vous</TableHead>
            <TableHead>Date de Rendez-vous</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {AllReservation?.map((a, i) => (
            <TableRow
              key={i}
              className="hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => {
                // navigate("/detail_patient");
              }}
            >
              <TableCell className="w-12">
                <CustomCheckbox
                  label=""
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
              </TableCell>

              {/* Docteur */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={a.medecin.profile} alt="Avatar" />
                    <AvatarFallback>NM</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">
                    {a.medecin.firstName} {a.medecin.lastName}
                  </span>
                </div>
              </TableCell>

              {/* Patient */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={a.patient.profile} alt="Avatar" />
                    <AvatarFallback>NM</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{a.patientName}</span>
                </div>
              </TableCell>

              <TableCell>{a.description}</TableCell>
              <TableCell>{a.location}</TableCell>
              <TableCell>
                {" "}
                {new Date(a.date).toLocaleDateString("fr-FR")}
              </TableCell>

              <TableCell>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium
      ${
        a.status === "COMPLETED"
          ? "bg-green-200 text-green-700"
          : a.status === "PENDING"
          ? "bg-yellow-200 text-yellow-700"
          : a.status === "CANCELLED"
          ? "bg-red-200 text-red-700"
          : "bg-gray-200 text-gray-700"
      }`}
                >
                  {a.status}
                </span>
              </TableCell>

              <TableCell className="w-12" onClick={(e) => e.stopPropagation()}>
                <Popover>
                  <PopoverTrigger className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">
                    <MoreHorizontal className="w-4 h-4" />
                  </PopoverTrigger>
                  <PopoverContent className="p-4 w-40">
                    <ul className="space-y-2">
                      <li
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDetailCard(true);
                        }}
                      >
                        <FaEdit className="text-gray-600" />
                        <span className="text-sm">Détail</span>
                      </li>

                      <li
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsOpen(true);
                        }}
                      >
                        <FaTrash className="text-red-600" />
                        <span className="text-sm text-red-500">Supprimer</span>
                      </li>
                    </ul>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-white">
          <TableRow>
            <TableCell colSpan={7}>
              <div className="flex justify-center my-4">
                <Pagination
                  pages={Math.ceil((count || 1) / 7)}
                  currentPage={page}
                  onPageChange={setPage}
                  rangeLimit={5}
                />
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

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
        <DetailRendez
        /*   idcartes={idCarte}
          descriptions={descriptions}
          nomCart={nomCart} */
        />
      </TMModal>
    </div>
  );
}

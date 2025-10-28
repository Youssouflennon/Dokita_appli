import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/components/ui/table";
import { Button } from "../../components/components/ui/button";
import { CustomCheckbox } from "../../components/components/ui/customcheck";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/components/ui/card";
import {
  CalendarIcon,
  ChevronDown,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";
import { FaEdit, FaSearch, FaTrash, FaUser } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import DetailAbonnement from "./detailAbonnement";
import TMModal from "../../components/components/ui/TM_Modal";
import TotalLoad from "../../components/components/totalLoad";
import { Label } from "../../components/components/ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
} from "../../components/components/ui/form";
import { Calendar } from "../../components/components/ui/calendar";
import Pagination from "../../components/components/ui/pagination";
import useStoreAbonnements from "src/store/abonnement/getAll";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "../../components/lib/utils";

type FilterFormValues = {
  date?: Date;
};

export default function Abonnement() {
  const form = useForm<FilterFormValues>({
    defaultValues: { date: undefined },
  });

  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [detailCard, setDetailCard] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const { Abonnements, loadingAbonnements, fetchAbonnements, count } =
    useStoreAbonnements();

  // --- Debounce recherche texte
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // --- Charger les abonnements
  useEffect(() => {
    const date = form.getValues("date");
    const formattedDate = date ? date.toISOString().split("T")[0] : undefined;

    fetchAbonnements({
      page,
      limit: 6,
      q: debouncedSearch,
      date: formattedDate,
    });
  }, [page, debouncedSearch, form.watch("date")]);

  if (loadingAbonnements) return <TotalLoad />;

  const handleApplyFilters = () => {
    const date = form.getValues("date");
    const formattedDate = date ? date.toISOString().split("T")[0] : undefined;

    fetchAbonnements({
      page: 1,
      limit: 6,
      q: debouncedSearch,
      date: formattedDate,
    });
    setPage(1);
  };

  return (
    <div className="flex flex-col p-4 h-full">
      {/*   <div className="flex justify-end">
        <div className="flex bg-primary p-2 rounded-full my-3 items-center gap-2 cursor-pointer text-white">
          <PlusCircle className="w-4 h-4" /> Ajouter un abonnement
        </div>
      </div> */}

      {/* --- Statistiques --- */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg">Nombre total des abonnements</p>
                <p className="text-2xl font-bold">
                  1,822{" "}
                  <span className="text-green-500 text-sm ml-1">+5.2%</span>
                </p>
              </div>
              <Button variant="outline" size="sm">
                <FaUser className="h-5 w-5" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-2">
          <div className="flex items-center justify-between border border-gray-200 p-1">
            <p className="text-sm text-muted-foreground">
              +140 ce dernier mois
            </p>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* --- Barre de recherche + filtre --- */}
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
                alt="Filtrer"
                className="h-6 w-6 rounded-full"
              />
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
                      handleApplyFilters();
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
                                onSelect={field.onChange}
                                locale={fr}
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
        </div>

        <button
          className="rounded-full text-white bg-primary"
          onClick={() => {
            fetchAbonnements({ page, limit: 6, q: debouncedSearch });
          }}
        >
          Annuler filtre
        </button>
      </div>

      {/* --- Tableau --- */}
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>
              <CustomCheckbox
                label=""
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
            </TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Médecin</TableHead>
            <TableHead>Début</TableHead>
            <TableHead>Fin</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Abonnements.map((item) => (
            <TableRow key={item.abonnementId}>
              <TableCell>
                <CustomCheckbox
                  label=""
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
              </TableCell>
              <TableCell>
                {item.patient.firstName} {item.patient.lastName}
              </TableCell>
              <TableCell>
                {item.medecin.firstName} {item.medecin.lastName}
              </TableCell>
              <TableCell>
                {new Date(item.debutDate).toLocaleDateString("fr-FR")}
              </TableCell>
              <TableCell>
                {new Date(item.endDate).toLocaleDateString("fr-FR")}
              </TableCell>
              <TableCell className="font-semibold text-gray-700">
                {Number(item.amount).toLocaleString("fr-FR")} FCFA
              </TableCell>
              <TableCell>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium 
                  ${
                    item.status === "CONFIRMED"
                      ? "bg-green-200 text-green-700"
                      : "bg-yellow-200 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>
              </TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger className="bg-gray-200 text-left px-4 py-1 text-sm border rounded-md hover:bg-gray-100">
                    <MoreHorizontal className="w-4 h-4" />
                  </PopoverTrigger>
                  <PopoverContent className="p-4 w-full">
                    <ul className="space-y-2 cursor-pointer">
                      <li
                        className="flex items-center gap-2 p-2 border-b last:border-none"
                        onClick={() => setDetailCard(true)}
                      >
                        <FaEdit className="text-gray-600 text-lg" />
                        <span className="font-medium text-gray-500 text-sm hover:text-gray-600">
                          Détail
                        </span>
                      </li>
                      <li
                        className="flex items-center gap-2 p-2 border-b last:border-none"
                        onClick={() => setIsOpen(true)}
                      >
                        <FaTrash className="text-red-600 text-lg" />
                        <span className="font-medium text-red-500 text-sm hover:text-red-600">
                          Supprimer
                        </span>
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

      {/* --- Modal suppression --- */}
      <Transition show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
            <Dialog.Panel className="bg-white p-6 rounded-lg shadow-xl">
              <Dialog.Title className="text-lg font-bold">
                Confirmer la suppression
              </Dialog.Title>
              <p className="mt-2">
                Voulez-vous vraiment supprimer cet abonnement ?
              </p>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  className="bg-gray-300 px-4 py-2 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Annuler
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded-md">
                  Supprimer
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      {/* --- Modal Détail --- */}
      <TMModal
        isOpen={detailCard}
        onClose={() => setDetailCard(false)}
        size="md"
        height={70}
      >
        <DetailAbonnement />
      </TMModal>
    </div>
  );
}

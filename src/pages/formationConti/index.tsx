import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/components/ui/table";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  PlusCircle,
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
import TMModal from "../../components/components/ui/TM_Modal";

import DetailFormation from "./detailFormation";
import TotalLoad from "../../components/components/totalLoad";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/components/ui/select";
import useStoreAllFormation from "src/store/formation/getAll";
import Pagination from "../../components/components/ui/pagination";
import useStoreCategories from "src/store/categorie/getAll";

export default function FormationCont() {
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [detailCard, setDetailCard] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const { Categories, loadingCategories, fetchCategories } =
    useStoreCategories();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const { AllFormation, loadingAllFormation, fetchAllFormation, count } =
    useStoreAllFormation();

  console.log("AllFormation", AllFormation);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    fetchAllFormation({ page, limit: 6, search: debouncedSearch });
  }, [page, debouncedSearch, fetchAllFormation]);

  if (loadingAllFormation) {
    return <TotalLoad />;
  }

  return (
    <div className="flex flex-col p-4 h-full mt-14">
      <div className="flex justify-end">
        <div
          className="flex items-center gap-2 bg-primary p-2 rounded-full my-3   text-white cursor-pointer"
          onClick={() => {
            navigate("/ajouter_formation");
          }}
        >
          <PlusCircle className="w-4 h-4" /> Ajouter une formation
        </div>
      </div>

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
              <span>Categories</span>
              <ChevronDown className="w-5 h-5 text-gray-600" />
            </PopoverTrigger>
            <PopoverContent className="">
              <div className="p-4 space-y-4">
                {/* Type */}
                <div className="space-y-1">
                  <Select
                    onValueChange={(value) => {
                      const selectedId: any = Number(value);
                      fetchAllFormation({ categoryId: selectedId });
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>

                    <SelectContent>
                      {Categories?.length > 0 ? (
                        Categories.map((cat: any) => (
                          <SelectItem
                            key={cat.categoryId}
                            value={String(cat.categoryId)}
                          >
                            {cat.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem disabled value="">
                          Aucune catégorie disponible
                        </SelectItem>
                      )}
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
            fetchAllFormation({ page, limit: 6, search: debouncedSearch });
          }}
        >
          Annuler filtre
        </button>
      </div>

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
            <TableHead>Nom du formulaire</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Heur de creation</TableHead>
            <TableHead>Nombre de symptomes</TableHead>
            <TableHead>Date de création</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {AllFormation?.map((a: any, i: any) => (
            <TableRow
              key={i}
              //  className="cursor-pointer"
              onClick={() => {
                //  navigate("/detail_patient");
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
                {a.name}
              </TableCell>
              <TableCell className="text-blue-600">{a.comment}</TableCell>
              <TableCell>
                {new Date(a.createdAt).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>{" "}
              <TableCell>5</TableCell>
              <TableCell>
                {new Date(a.createdAt).toLocaleDateString("fr-FR")}
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
                          setDetailCard(true);

                          //  handleRowClick(item.id);
                        }}
                        // navigate(0);
                      >
                        <FaEdit
                          className="text-gray-600 text-lg cursor-pointer"
                          onClick={(event) => {
                            event.stopPropagation();
                            setDetailCard(true);

                            //  handleRowClick(item.id);
                          }}
                        />
                        <span className="font-medium text-gray-500 text-sm hover:text-gray-600 transition-colors duration-200">
                          Detail
                        </span>
                      </li>

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
        <DetailFormation
        /*   idcartes={idCarte}
          descriptions={descriptions}
          nomCart={nomCart} */
        />
      </TMModal>
    </div>
  );
}

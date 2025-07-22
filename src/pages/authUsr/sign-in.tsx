import { useForm } from "react-hook-form";
import {
  Form,
  FormItem,
  FormControl,
  FormMessage,
  FormField,
} from "./../../components/components/ui/form";
import React, { useState } from "react";
import { Button } from "./../../components/components/ui/button";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/hooks/use-toast";
import { Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import { Input } from "../../components/components/ui/input";
import { Label } from "../../components/components/ui/label";

const SignIn = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: { email: string; password: string }) => {
    navigate("/");

    /*     try {
      setIsLoading(true);
      await login(data.email, data.password);
      toast({
        title: t("auth.success_connection"),
        description: t("auth.success_connection_description"),
      });
      navigate("/");
    } catch (error: any) {
      console.error(t("auth.error_connection"), error);

      if (error.response) {
        const status = error.response.status;

        if (status === 401) {
          toast({
            variant: "destructive",
            title: t("auth.error_connection"),
            description: t("auth.error_connection_description"),
          });
        } else if (status === 200) {
          toast({
            title: t("auth.success_connection"),
            description: t("auth.success_connection_description"),
          });
          navigate("/");
        } else {
          toast({
            variant: "destructive",
            title: t("auth.error_connection"),
            description: t("auth.error_connection_description"),
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: t("auth.error_connection"),
          description: t("auth.error_connection_description"),
        });
      }
    } finally {
      setIsLoading(false);
    } */
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Illustration */}
        <div className="bg-white flex items-center justify-center p-6">
          <img
            src="/illusMed.png"
            alt="Illustration médicale"
            className="max-w-full h-auto"
          />
        </div>

        {/* Formulaire */}
        <div className="p-8 flex flex-col justify-center">
          <div className="flex flex-col justify-center items-center gap-2 mb-6">
            <img
              src="/logo.png"
              alt="Avatar"
              className="w-12 h-12 flex items-center"
            />
            <h1 className="text-3xl font-bold text-gray-800">Dokita</h1>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Nom d’utilisateur</Label>
              <Input
                id="username"
                placeholder="Entrez votre nom d’utilisateur ou email"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="Entrez votre mot de passe"
                className="mt-1"
              />
            </div>

            <Button
              className="w-full text-white rounded-full bg-primary hover:bg-[#1b324f]"
              onClick={() => {
                navigate("/");
              }}
            >
              Connexion
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

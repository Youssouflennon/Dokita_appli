export default function SubscriptionDetails() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg  text-sm">
      {/* Title */}
      <div className="text-lg font-semibold">Détails de l’abonnement</div>

      {/* Bloc: Détails du Médecin */}
      <div>
        <h2 className="text-base font-medium mb-2">Détails du Médecin</h2>
        <div className="grid grid-cols-2 gap-4">
          <Detail label="Nom" value="Nana Momo" />
          <Detail label="Spécialisation" value="Cardiologiste" />
        </div>
      </div>

      {/* Bloc: Détails de l’abonnement */}
      <div>
        <h2 className="text-base font-medium mb-2">Détails de l’abonnement</h2>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div>
            <div className="text-gray-500 text-xs">Statut</div>
            <div className="text-green-600 font-medium">Active</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs">Date d'expiration</div>
            <div className="text-orange-500 font-medium">15/10/2026</div>
          </div>
        </div>
        <div>
          <div className="text-gray-500 text-xs mb-1">Responsabilités</div>
          <p className="text-gray-700 leading-snug">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
            eleifend tempor. Integer ut justo et dolor magna aliquam. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p className="text-gray-700 mt-2">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident.
          </p>
          <p className="mt-2 font-medium text-gray-800">1 mois</p>
        </div>
      </div>

      {/* Bloc: Paiement */}
      <div>
        <h2 className="text-base font-medium mb-2">Paiement</h2>
        <div className="grid grid-cols-2 gap-4">
          <Detail label="Mode de paiement" value="Orange Money" />
          <Detail label="Frais" value="10 000 FCFA" />
          <Detail label="Autre" value="Lorem ipsum" />
        </div>
      </div>

      {/* Bloc: Documents associés */}
      <div>
        <h2 className="text-base font-medium mb-2">Documents associés</h2>
        <div className="space-y-3">
          {["Brief", "Documentation", "Cahier de charge"].map((doc, i) => (
            <div
              key={i}
              className="flex justify-between items-center border rounded-md px-4 py-2 bg-gray-50"
            >
              <span className="font-medium">{doc}</span>
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <button className="hover:underline">📄</button>
                <button className="hover:underline">⬇️</button>
                <button className="hover:underline text-red-500">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-gray-500 text-xs">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

import Link from "next/link";

export const AddressList = ({ api }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {api.data?.data?.map((address, index) => {
        return (
          <div className="hover:scale-95 transition-all">
            <Link href={`/profile/address/${address.address_id}`} title={address.title} key={index}>
              <div className="rounded-lg border border-slate-300">
                <div className="flex flex-col text-slate-700 space-y-1.5 px-6 py-4">        
                  <h2 className="text-2xl font-bold">{address.title}</h2>
                  <p className="leading-none">
                    {address.street},
                  </p>
                  <p className="leading-none">
                    {address.city}, {address.province} {address.postal_code}
                  </p>
                  <p className="leading-none">
                    {address.country}.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
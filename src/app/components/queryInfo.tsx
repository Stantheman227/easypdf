"use client";
import supabase from "@/Services/supaBaseClinet";

import { useState, useEffect } from "react";

export default function QueryInfo() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ pdf_count: 0 });

  useEffect(() => {
    const fetchQueryInfo = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        console.error("No user logged in.");
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("pdf_metadata")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching query info:", error);
      }

      setData(data);
      setLoading(false);
    };

    fetchQueryInfo();
  }, []);

  return (
    <div className="bg-easy-blue-200 rounded-lg w-full p-5">
      <p className="font-bold text-center"> Query status </p>
      <p className="font-bold"> PDF Anfragen heute: {data.pdf_count} von 3 </p>
    </div>
  );
}

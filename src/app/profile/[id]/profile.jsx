"use client";

import { useParams } from "next/navigation";

const Profile = () => {
  const { id } = useParams();
  return <div>Profile {id}</div>;
};
export default Profile;

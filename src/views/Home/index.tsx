import React, { useCallback, useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import Form from "../../components/Form";
import Table from "../../components/Table";
import {
  addMemberService,
  authService,
  getMembersService,
} from "../../services";
import { Member } from "../../types";

const Home: React.FC = (): React.ReactElement => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [tableData, setTableData] = useState<Member[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleOnIdle = useCallback(() => {
    try {
      getMembersService().then((members) => setTableData(members));
    } catch (error) {
      console.warn(error);
    }
  }, []);

  useIdleTimer({ timeout, onIdle: handleOnIdle });

  // USER AUTHENTICATION
  useEffect(() => {
    try {
      authService().then((auth) => setIsAuth(auth));
    } catch (error) {
      console.warn(error);
    }
    return () => localStorage.removeItem("token");
  }, [setIsAuth]);

  // GET MEMBERS DATA FROM THE API
  useEffect(() => {
    if (isAuth) {
      try {
        getMembersService().then((members) => setTableData(members));
      } catch (error) {
        console.warn(error);
      }
    }
  }, [isAuth]);

  // ADD A NEW MEMBER TO THE TABLE
  const addMember = useCallback(
    (newMember: Member) => {
      const repeatedMember = tableData.find(
        (member) => member.ssn === newMember.ssn
      );

      if (!repeatedMember) {
        try {
          addMemberService(newMember).then((member) => {
            if (member !== null) {
              setTableData([...tableData, member]);
            }
          });
        } catch (error) {
          setErrorMessage(
            "There was an unexpected error adding the new member"
          );
        }
        addMemberService(newMember).then((member) => {
          if (member !== null) {
            setTableData([...tableData, member]);
          }
        });
      } else {
        setErrorMessage("SSN Already exists");
      }
    },
    [tableData]
  );

  const closeErrorMessage = useCallback(() => setErrorMessage(null), []);

  return (
    <div className="flex h-5/6 w-full justify-center gap-6 items-center px-8 relative">
      {!isAuth ? (
        <h3>Loading...</h3>
      ) : (
        <div className="flex w-full gap-6">
          <div className="w-4/12">
            <Form onSubmitAction={addMember} />
          </div>
          <div className="w-8/12 overflow-y-auto">
            <Table data={tableData} />
          </div>
        </div>
      )}
      {errorMessage && (
        <div className="h-12 rounded-md bg-red-700 text-white flex items-center absolute bottom-20 left-50 px-8">
          <h3>{errorMessage}</h3>
          <div className="ml-5 cursor-pointer" onClick={closeErrorMessage}>
            X
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

const timeout = 120000;

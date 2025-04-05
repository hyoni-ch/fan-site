"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import { User } from "@/types/iadmin";
import { getUserInfo, postAddRole } from "@/api/admin";
import useAuthStore, { getUserRoles } from "@/store/authStore";
import UserListTable from "./_component/userListTable";

const AdminUserListPage: React.FC = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  // 관리자 권한 상태
  const [authChecked, setAuthChecked] = useState(false);
  // 전역 상태에서 역할 정보 가져오기
  const { roles } = useAuthStore();
  const router = useRouter();
  const [allRoles, setAllRoles] = useState<string[]>([]);

  const getRoleLabel = useCallback((role: string) => {
    return role.replace(/^ROLE_/, "");
  }, []);

  useEffect(() => {
    const checkAdminRole = () => {
      // 로컬 스토리지에서 역할 정보를 가져오거나, Zustand 스토어의 현재 역할 정보를 사용
      const storedRoles = getUserRoles() || roles;
      // 관리자 역할이 없으면 메인 페이지로 리다이렉트
      if (!storedRoles || !storedRoles.includes("ROLE_ADMIN")) {
        router.push("/");
        return;
      }
      // 관리자 역할이 확인되면 authChecked 상태를 true로 설정
      setAuthChecked(true);
    };
    checkAdminRole();
  }, [roles, router]);

  useEffect(() => {
    if (authChecked) {
      const fetchAdminData = async () => {
        setLoading(true);
        setError(null);
        try {
          const usersData = await getUserInfo();
          setUserList(usersData);
          //! 모든 가능한 역할 목록 설정--> 이 부분 수정 사항에 포함해야할듯.
          setAllRoles(["ROLE_USER", "ROLE_ADMIN", "ROLE_ARTIST"]);
        } catch (err) {
          setError(err instanceof Error ? err : new Error(String(err)));
        } finally {
          setLoading(false);
        }
      };
      fetchAdminData();
    }
  }, [authChecked]);

  // 사용자 역할 변경 후 저장 버튼 클릭 시 호출되는 비동기 콜백 함수
  const handleSaveRoles = useCallback(
    async (nickname: string, rolesToUpdate: string[]) => {
      try {
        // 서버에 변경된 역할 정보 전송
        await postAddRole(nickname, rolesToUpdate);
        console.log(`역할이 성공적으로 업데이트되었습니다: ${nickname}`);
        // 역할 업데이트 후 최신 사용자 정보 다시 가져오기
        const data = await getUserInfo();
        setUserList(data);
      } catch (error) {
        console.error(`역할 업데이트 실패: ${nickname}`, error);
      }
    },
    [setUserList]
  );

  if (!authChecked) {
    return null;
  }

  return (
    <div style={{ height: "100vh", padding: 16 }}>
      <h1>전체 사용자 목록</h1>
      <UserListTable
        users={userList} // 사용자 목록
        allRoles={allRoles} // 모든 역할 목록
        onSaveRoles={handleSaveRoles} // 역할 저장 함수
        loading={loading}
        error={error}
        getRoleLabel={getRoleLabel} // 역할 레이블 변환
      />
    </div>
  );
};

export default AdminUserListPage;

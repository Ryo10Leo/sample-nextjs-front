import { renderHook, waitFor } from "@testing-library/react";
import { Auth } from "aws-amplify";
import { useProvideAuth } from "./useAuth";

jest.mock("aws-amplify");
jest.mock("next/navigation");

describe("useProvideAuth", () => {
  describe("初期表示の状態テスト", () => {
    describe("ユーザーデータが取得できた場合", () => {
      beforeEach(() => {
        jest.spyOn(Auth, "currentAuthenticatedUser").mockImplementation(
          () =>
            new Promise((resolve) => {
              const currentUser = {
                username: "test_user",
              };
              resolve(currentUser);
            }),
        );
      });
      test("ユーザーネームが設定される", async () => {
        const renderHookResult = renderHook(() => useProvideAuth());
        await waitFor(() => expect(renderHookResult.result.current.userName).toBe("test_user"));
      });
      test("認証成功ステータスが設定される", async () => {
        const renderHookResult = renderHook(() => useProvideAuth());
        await waitFor(() => expect(renderHookResult.result.current.isAuthenticated).toBeTruthy());
      });
    });
    describe("ユーザーデータが取得できなかった場合", () => {
      beforeEach(() => {
        jest.spyOn(Auth, "currentAuthenticatedUser").mockImplementation(
          () =>
            new Promise((resolve) => {
              resolve(null);
            }),
        );
      });
      test("ユーザーネームが設定されない", async () => {
        const renderHookResult = renderHook(() => useProvideAuth());
        await waitFor(() => expect(renderHookResult.result.current.userName).toBe(""));
      });
      test("認証成功ステータスが設定されない", async () => {
        const renderHookResult = renderHook(() => useProvideAuth());
        await waitFor(() => expect(renderHookResult.result.current.isAuthenticated).toBeFalsy());
      });
    });
    describe("ユーザーデータが取得時にエラーになった場合", () => {
      beforeEach(() => {
        jest.spyOn(Auth, "currentAuthenticatedUser").mockImplementation(
          () =>
            new Promise((reject) => {
              reject(new Error("エラー"));
            }),
        );
      });
      test("ユーザーネームが設定されない", async () => {
        const renderHookResult = renderHook(() => useProvideAuth());
        await waitFor(() => expect(renderHookResult.result.current.userName).toBe(""));
      });
      test("認証成功ステータスが設定されない", async () => {
        const renderHookResult = renderHook(() => useProvideAuth());
        await waitFor(() => expect(renderHookResult.result.current.isAuthenticated).toBeFalsy());
      });
    });
  });
});

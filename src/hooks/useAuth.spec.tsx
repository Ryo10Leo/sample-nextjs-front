import { renderHook, waitFor } from "@testing-library/react";
import { useProvideAuth } from "./useAuth";
import { Auth } from "aws-amplify";

jest.mock("aws-amplify");
jest.mock("next/navigation");

describe("useProvideAuth", () => {
  describe("初期表示の状態テスト", () => {
    describe("ユーザーデータが取得できた場合", () => {
      test("ユーザーネームが設定される", async () => {
        jest.spyOn(Auth, "currentAuthenticatedUser").mockImplementation(
          () =>
            new Promise((resolve) => {
              const currentUser = {
                username: "test_user",
              };
              return resolve(currentUser);
            }),
        );
        const renderHookResult = renderHook(() => useProvideAuth());
        await waitFor(() => expect(renderHookResult.result.current.userName).toBe("test_user"));
      });
    });
  });
});

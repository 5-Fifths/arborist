export type ApiResponse<T> = {
    success: true;
    result: T;
}
| {
    success: false;
    result: string;
}
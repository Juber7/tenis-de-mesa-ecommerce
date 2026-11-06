/** Routes that use the poster-style side rail instead of the classic header. */
export function usesSideRail(pathname: string) {
  return (
    ["/", "/tienda", "/carrito", "/contacto"].includes(pathname) ||
    pathname.startsWith("/producto/") ||
    pathname.startsWith("/legal/")
  );
}

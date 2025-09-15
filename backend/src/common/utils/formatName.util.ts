  /** Format tên: chữ đầu mỗi từ viết hoa, xóa khoảng trắng thừa */
export function formatName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

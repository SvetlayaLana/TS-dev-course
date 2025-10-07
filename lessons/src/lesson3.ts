type ApiSuccess = { status: "success"; data: string };
type ApiError = { status: "error"; error: string };
type ApiResponse = ApiSuccess | ApiError;

function handleResponse(response: ApiResponse) {
    if (response.status === "success") {
        console.log(response.data);
    } else {
        console.log(response.error)
    }
}

const COLORS = {
    GREEN: "green",
    RED: "red",
    BLUE: "blue",
} as const;

type Color = typeof COLORS[keyof typeof COLORS];

const color: Color = COLORS.GREEN;

enum Status {
    PENDING,
    IN_PROGRESS,
    COMPLETED,
}

enum StatusString {
    PENDING = "pending",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
}

enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

console.log(Direction);
console.log(Direction.UP)
console.log(Direction[0])

console.log(Object.keys(Direction))
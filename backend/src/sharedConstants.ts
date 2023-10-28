export const HAVERSINE_FORMULA = ` (
      6371 * acos(
        cos(
          radians(?)
        ) * cos(
          radians(latitude)
        ) * cos(
          radians(longitude) - radians(?)
        ) + sin(
          radians(?)
        ) * sin(
          radians(latitude)
        )
      )
    )`;

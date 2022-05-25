// eslint-disable-next-line @typescript-eslint/ban-types
export const hideControls = <T extends object>(
  controlNames: Array<keyof T>
) => controlNames
    .reduce((object, controlName) => ({
      ...object,
      [controlName]: {
        table: {
          disable: true,
        },
      },
    }),
    {});

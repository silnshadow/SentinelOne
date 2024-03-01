import { Inject } from "@angular/core";


@Inject
class WeatherForecastRepository{
    WeatherForecastRepository(){};

    interface AuthProps {
        user: { id: string } | null;
      }
      
      const authStore = createStore(
        { name: 'auth' },
        withProps<AuthProps>({ user: null })
      );

}
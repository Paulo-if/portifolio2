"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes, protectedRoutes } from "@/resources";
import { Flex, Spinner, Button, Heading, Column, PasswordInput } from "@once-ui-system/core";
import NotFound from "@/app/not-found";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const checkRouteEnabled = (path: string | null) => {
    if (!path) return false;

    if (path in routes) {
      return routes[path as keyof typeof routes];
    }

    // Check for exact matches first, then prefixes
    const exactMatch = Object.keys(routes).find(route => route === path);
    if (exactMatch) {
      return routes[exactMatch as keyof typeof routes];
    }

    const dynamicRoutes = ["/blog", "/work"] as const;
    for (const route of dynamicRoutes) {
      if (path?.startsWith(route) && routes[route]) {
        return true;
      }
    }

    return false;
  };

  const [isRouteEnabled, setIsRouteEnabled] = useState(() => checkRouteEnabled(pathname));
  const [isPasswordRequired, setIsPasswordRequired] = useState(() => !!protectedRoutes[pathname as keyof typeof protectedRoutes]);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(() => !!protectedRoutes[pathname as keyof typeof protectedRoutes]);

  useEffect(() => {
    const performChecks = async () => {
      const isProtected = !!protectedRoutes[pathname as keyof typeof protectedRoutes];

      if (isProtected) {
        setLoading(true);
        const response = await fetch("/api/check-auth");
        if (response.ok) {
          setIsAuthenticated(true);
        }
        setLoading(false);
      } else {
        const routeEnabled = checkRouteEnabled(pathname);
        setIsRouteEnabled(routeEnabled);
        setIsPasswordRequired(false);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    performChecks();
  }, [pathname]);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

  if (loading) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  if (!isRouteEnabled) {
    return <NotFound />;
  }

  if (isPasswordRequired && !isAuthenticated) {
    return (
      <Column paddingY="128" maxWidth={24} gap="24" center>
        <Heading align="center" wrap="balance">
          This page is password protected
        </Heading>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </Column>
      </Column>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };

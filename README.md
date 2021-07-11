# Overlay Package

A way to open floating panels on the screen.

## Creating Overlays

`overlay.create()` will return an `OverlayRef` instance. This instance is a handle for managing that specific overlay.

The `OverlayRef` is a `PortalOutlet` - once created, content can be added by attaching a Portal.

    const overlayRef = overlay.create();
    const userProfilePortal = new ComponentPortal(UserProfile);
    overlayRef.attach(userProfilePortal);


# Portals
A Portal is a piece of UI that can be dynamically rendered to an open slot on the page.

The "piece of UI" can be either a Component, a TemplateRef or a DOM element and the "open slot" is a PortalOutlet.

    <div class="example-portal-outlet">
      <ng-template [cdkPortalOutlet]="selectedPortal"></ng-template>
    </div>

    <button (click)="selectedPortal = componentPortal">Render component portal</button>
    <button (click)="selectedPortal = templatePortal">Render template portal</button>

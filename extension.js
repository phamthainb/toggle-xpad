const St = imports.gi.St;
const Main = imports.ui.main;
const Util = imports.misc.util;
const Shell = imports.gi.Shell;

let toggleXpad;

function init(extensionMeta) {}

function enable() {
  toggleXpad = new St.Bin({
    style_class: "panel-button",
    reactive: true,
    can_focus: true,
    x_fill: true,
    y_fill: false,
    track_hover: true,
  });

  let icon = new St.Icon({
    icon_name: "document-edit-symbolic",
    style_class: "system-status-icon",
  });

  toggleXpad.set_child(icon);
  toggleXpad.connect("button-press-event", handle);

  Main.panel._rightBox.insert_child_at_index(toggleXpad, 0);
}

function disable() {
  toggleXpad.destroy();
  toggleXpad = null;
}

function handle() {
  try {
    Util.trySpawnCommandLine("xpad --toggle");
  } catch (err) {
    Main.notify("Somthing is wrong :(");
  }
}
